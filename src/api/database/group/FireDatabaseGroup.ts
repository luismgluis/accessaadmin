import { isJSDocThisTag } from "typescript";
import utils from "../../../libs/utils/utils";
import { ChannelType } from "../../../types/ChannelType";
import GroupType from "../../../types/GroupType";
import UserType from "../../../types/UserType";
import App from "../../App";

const TAG = "FIRE DATABASE GROUP";
class FireDatabaseGroup {
  app: App;
  currentUser: UserType;
  constructor(app: App) {
    this.app = app;
    this.currentUser = new UserType("", null);
  }
  getGroupInfo(idGroup: string) {
    const db = this.app.database();
    return new Promise<GroupType>((resolve, reject) => {
      try {
        db.collection("groups")
          .doc(idGroup)
          .get()
          .then((result) => {
            const data: any = result.data();
            if (data) {
              resolve(new GroupType(result.id, data));
              return;
            }
            console.log(TAG, result);
            reject(null);
          })
          .catch((err) => {
            console.log("catch", err);
            reject(null);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  getGroupsIds(
    me: UserType,
    callBack: (data: string[]) => void,
    onError: (err: string) => void
  ) {
    const db = this.app.database();
    console.log(TAG, "getuser");
    const unsub = db
      .collection("users")
      .doc(me.id)
      .collection("groups")
      .onSnapshot(
        (result) => {
          if (!result.empty) {
            const data: string[] = [];
            result.forEach((doc) => {
              data.push(<string>doc.id);
            });
            console.log(TAG, data);
            callBack(data);
            return;
          }
          console.log(TAG, result);
          callBack([]);
        },
        (err) => {
          console.log(TAG, err);
        },
        () => {
          console.log(TAG, "fin");
        }
      );
    return unsub;
  }
  getChannels(idGroup: string) {
    const db = this.app.database();
    return new Promise<Array<any>>((resolve, reject) => {
      try {
        db.collection("groups")
          .doc(idGroup)
          .collection("channels")
          .get()
          .then((snap) => {
            const arr: Array<any> = [];
            snap.forEach((doc) => {
              arr.push({ ...doc.data(), id: doc.id });
            });
            resolve(arr);
          })
          .catch((err) => {
            console.log("catch", err);
            reject(null);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  searchGroupByAt(at: string): Promise<GroupType[]> {
    return new Promise<GroupType[]>((resolve, reject) => {
      try {
        const groupsCollection = this.app.database().collection("groups");
        groupsCollection
          .where("at", "==", at)
          .limit(1)
          .get()
          .then((res) => {
            const data: GroupType[] = [];
            if (res == null) {
              resolve(data);
              return;
            }
            res.forEach((doc) =>
              data.push(new GroupType(doc.id, <any>doc.data()))
            );
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  addChannelToMyGroup(
    me: UserType,
    idGroup: string,
    name: string
  ): Promise<ChannelType> {
    console.log(TAG, "addcahnnel");
    const groupsChannelsCollection = this.app
      .database()
      .collection("groups")
      .doc(idGroup)
      .collection("channels");

    const groupsChatRoomsCollection = this.app
      .database()
      .collection("chat_rooms");

    const newChatRoom = groupsChatRoomsCollection.doc();
    groupsChatRoomsCollection.doc(newChatRoom.id).set({ idGroup: idGroup });

    const newChannel = new ChannelType(newChatRoom.id, {
      id: newChatRoom.id,
      chatRoomID: newChatRoom.id,
      creationDate: utils.dates.dateNowUnix(),
      name: name,
      onlyAdmins: false,
      creator: me.id,
    });

    return new Promise<ChannelType>((resolve, reject) => {
      try {
        groupsChannelsCollection
          .add(newChannel.exportToUpload())
          .then(() => {
            console.log(TAG, "yes");
            resolve(newChannel);
          })
          .catch((err) => {
            console.log(TAG, "fail");
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  addGroupToMyGroups(
    me: UserType,
    idGroup: string,
    resolve: {
      (value: boolean | PromiseLike<boolean>): void;
      (res: any): void;
      (arg0: boolean): any;
    },
    reject: { (reason?: any): void; (err: any): void; (arg0: any): any }
  ): void {
    const groupsDoc = this.app
      .database()
      .collection("users")
      .doc(me.id)
      .collection("groups")
      .doc(idGroup);
    const newField = { creationDate: utils.dates.dateNowUnix() };

    groupsDoc
      .set(newField)
      .then(() => resolve(true))
      .catch((err) => reject(err));
  }
  addMeToGroupUsers(me: UserType, idGroup: string): Promise<void> {
    const groupsCollection = this.app
      .database()
      .collection("groups")
      .doc(idGroup)
      .collection("members");
    const newField = { creationDate: utils.dates.dateNowUnix() };
    return groupsCollection.doc(me.id).set(newField);
  }
  addUserToMyGroup(idGroup: string, idUser: string): Promise<any> {
    const groupDoc = this.app.database().collection("groups").doc(idGroup);

    return groupDoc.collection("members").doc(idUser).set({
      creationDate: utils.dates.dateNowUnix(),
    });
  }
  addAdminToMyGroup(idGroup: string, idUser: string): Promise<any> {
    const groupDoc = this.app.database().collection("groups").doc(idGroup);
    this.addUserToMyGroup(idGroup, idUser);
    return groupDoc.collection("admins").doc(idUser).set({
      creationDate: utils.dates.dateNowUnix(),
    });
  }
  removeMember(idGroup: string, idUser: string) {
    const that = this;
    const groupDoc = this.app.database().collection("groups").doc(idGroup);

    return new Promise<boolean>((resolve, reject) => {
      try {
        groupDoc
          .collection("members")
          .doc(idUser)
          .delete()
          .then((result) => {
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  getMembers(idGroup: string): Promise<UserType[]> {
    const that = this;
    const groupDoc = this.app.database().collection("groups").doc(idGroup);
    return new Promise<UserType[]>((resolve, reject) => {
      try {
        groupDoc
          .collection("members")
          .get()
          .then(async (result) => {
            const arr: UserType[] = [];
            for (const key in result.docs) {
              if (Object.prototype.hasOwnProperty.call(result.docs, key)) {
                const item = result.docs[key];
                const data = await that.app.databaseFns.user
                  .getUser(item.id)
                  .catch(() => new UserType("", null));
                if (data) arr.push(new UserType(item.id, data));
              }
            }
            resolve(arr);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  joinGroup(idGroup: string): Promise<boolean> {
    const that = this;
    // const me = that.apiUsers.currentUser;
    const me = that.currentUser;

    return new Promise<boolean>((resolve, reject) => {
      try {
        console.log(TAG, "joinGroup", idGroup);
        that
          .getGroupByID(idGroup)
          .then((group) => {
            console.log(TAG, group);
            if (!group.isEmpty()) {
              that
                .addMeToGroupUsers(me, idGroup)
                .then(() =>
                  that.addGroupToMyGroups(me, idGroup, resolve, reject)
                )
                .catch((err) => {
                  console.log(TAG, "fail to join group", err);
                  reject(err);
                });
              return;
            }
            reject(null);
          })
          .catch(() => reject(null));
      } catch (error) {
        reject(null);
      }
    });
  }
  getGroupByID(id: string): Promise<GroupType> {
    return new Promise<GroupType>((resolve, reject) => {
      try {
        const groupsCollection = this.app.database().collection("groups");
        groupsCollection
          .doc(id)
          .get()
          .then((res) => {
            const data: any = res.data();
            if (data !== null) {
              resolve(new GroupType(id, data));
              return;
            }
            reject(null);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  createGroup(name: string, nickname: string, me: UserType) {
    const that = this;
    this.currentUser = me;

    const addNewGroup = (
      groupInfo: GroupType,
      resolve: {
        (value: GroupType | PromiseLike<GroupType>): void;
        (arg0: GroupType): void;
      },
      reject: { (reason?: any): void; (arg0: null): void }
    ) => {
      groupInfo.at = groupInfo.at.replace(" ", "").toLowerCase();
      const groupsCollection = that.app.database().collection("groups");
      const newGroup = groupsCollection.doc();
      const completeCreation = async () => {
        const res = {
          a1: false,
          a2: false,
          a3: false,
        };
        res.a1 = await that
          .addAdminToMyGroup(newGroup.id, me.id)
          .then(() => true)
          .catch((err) => {
            console.log(TAG, "addAdminToMyGroup", err);
            return false;
          });
        res.a2 = await that
          .addMeToGroupUsers(me, newGroup.id)
          .then(() => true)
          .catch((err) => {
            console.log(TAG, "addMeToGroupUsers", err);
            return false;
          });
        res.a3 = await that
          .addChannelToMyGroup(me, newGroup.id, "General")
          .then(() => true)
          .catch((err) => {
            console.log(TAG, "addChannelToMyGroup", err);
            return false;
          });
        console.log(TAG, res);
        that.addGroupToMyGroups(
          me,
          newGroup.id,
          (res: any) => {
            if (res) {
              groupInfo.id = newGroup.id;
              resolve(groupInfo);
              return;
            }
            reject(null);
          },
          (err: any) => {
            console.log(TAG, err);
            reject(err);
          }
        );
      };
      groupsCollection
        .doc(newGroup.id)
        .set(groupInfo.exportToUpload())
        .then(() => completeCreation())
        .catch((err) => reject(err));
    };
    return new Promise<GroupType>((resolve, reject) => {
      try {
        const newGroup = new GroupType("", {
          name: name,
          public: false,
          at: nickname,
          creationDate: utils.dates.dateNowUnix(),
          creator: me.id,
          id: "",
        });
        if (newGroup.name === "" || newGroup.at === "") {
          reject(null);
          return;
        }
        console.log(TAG, "addnewgroup");
        addNewGroup(newGroup, resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
}

export default FireDatabaseGroup;
