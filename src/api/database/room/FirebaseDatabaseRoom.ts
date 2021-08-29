import ChatMessageType from "../../../components/ui/ChatRoom/ChatMessageType";
import utils from "../../../libs/utils/utils";
import App from "../../App";
import FireStorage from "../storage/FireStorage";

const TAG = "API ROOM";
class FirebaseDatabaseRoom {
  apiStorage: FireStorage;
  app: App;
  constructor(app: App) {
    this.app = app;
    this.apiStorage = new FireStorage(app);
  }

  getRoomMessages(
    idRoom: string,
    setMessages: (data: Array<ChatMessageType>) => void,
    creationDateLimit?: number,
    intents = 0
  ): any {
    const that = this;
    if (intents > 20) {
      setMessages([]);
      return () => null;
    }

    const groupColletion = this.app.database().collection("chat_rooms"); //  .collection("chat_rooms");

    function onResult(snap: any) {
      const arr = Array<ChatMessageType>();
      console.log(TAG, "get messages");
      snap.forEach((doc: any) => {
        const msj = new ChatMessageType(doc.id, doc.data());
        if (!msj.isEmpty()) {
          arr.push(msj);
        }
      });
      setMessages(arr);
    }

    function onError(error: any) {
      console.error(TAG, "try again get room messages", error);
      if (`${error}`.includes("firestore/permission-denied")) {
        return;
      }
      that.getRoomMessages.call(that, idRoom, setMessages, intents);
    }
    const unSubs = creationDateLimit
      ? groupColletion
          .doc(idRoom)
          .collection("messages")
          .where("creationDate", "<", creationDateLimit)
          .orderBy("creationDate", "asc")
          .limitToLast(20)
          .onSnapshot(onResult, onError)
      : groupColletion
          .doc(idRoom)
          .collection("messages")
          .orderBy("creationDate", "asc")
          .limitToLast(20)
          .onSnapshot(onResult, onError);

    return unSubs;
  }
  uploadRoomMessage(
    roomID: string,
    msj: ChatMessageType,
    reject: () => void,
    onSuccess: () => void = () => null
  ): void {
    const that = this;

    msj.creationDate = utils.dates.dateNowUnix();

    if (msj.isEmpty()) {
      console.error(TAG, "msj is empty");
      reject();
      return;
    }
    if (!msj.exportToUpload()) {
      console.error(TAG, "Fail exportTo upload");
      reject();
      return;
    }

    const roomsCollection = this.app.database().collection("chat_rooms");
    const newMessage = roomsCollection.doc(roomID).collection("messages").doc();

    const saveMessage = (messageData: ChatMessageType) => {
      const newData = messageData.exportToUpload();
      roomsCollection
        .doc(roomID)
        .collection("messages")
        .doc(newMessage.id)
        .set(newData)
        .then(() => {
          /** */
          onSuccess();
        })
        .catch((err) => {
          console.error(TAG, "saveMessage err", err);
          reject();
        });
    };
    const saveImage = () => {
      const filePath = `chat_rooms/${roomID}/messages/${newMessage.id}`;
      that.apiStorage.saveFile(
        filePath,
        msj.fileUrl!,
        (progress) => {
          /** */
        },
        (url) => {
          msj.setFileUpload(true);
          msj.setImage(url, msj.fileDimensions!);
          saveMessage(msj);
        },
        (err) => {
          console.error(TAG, "reject", err);
        }
      );
    };

    const saveAudio = () => {
      const filePath = `chat_rooms/${roomID}/messages/${newMessage.id}`;
      that.apiStorage.saveFile(
        filePath,
        msj.fileUrl!,
        (progress) => {
          /** */
        },
        (url) => {
          msj.setFileUpload(true);
          msj.setAudio(url, msj.fileSize!, msj.fileTime!);
          saveMessage(msj);
        },
        (err) => {
          console.error(TAG, "reject", err);
        }
      );
    };

    if (msj.type === "image") {
      saveImage();
      return;
    } else if (msj.type === "audio") {
      saveAudio();
      return;
    }
    saveMessage(msj);
  }
}
export default FirebaseDatabaseRoom;
