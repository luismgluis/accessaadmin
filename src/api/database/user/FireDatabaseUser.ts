import utils from "../../../libs/utils/utils";
import UserType from "../../../types/UserType";
import App from "../../App";

const TAG = "FIRE DATABASE USER";
class FireDatabaseUser {
  private app: App;
  constructor(app: App) {
    this.app = app;
  }
  saveUser(user: UserType): Promise<UserType> {
    const that = this;
    return new Promise<UserType>((resolve, reject) => {
      try {
        that.app
          .database()
          .collection("users")
          .doc(user.id)
          .set(user.exportToUpload())
          .then(() => {
            // uploadImage(resolve, reject);
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  createUserWithEmail(
    name: string,
    at: string,
    email: string,
    password: string
  ) {
    const that = this;
    const saveInfo = (uid: any, resolve: any, reject: any) => {
      const user = new UserType(uid, {
        id: uid,
        name: name,
        nickname: `${at}`.replace(" ", "").toLowerCase(),
        email: `${email}`.toLowerCase(),
        creationDate: utils.dates.dateNowUnix(),
        profileImage: "",
      });

      that
        .saveUser(user)
        .then((result) => {
          resolve(uid);
        })
        .catch((err) => {
          reject(err);
        });
    };
    const create = (resolve: any, reject: any) => {
      this.app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          if (result !== null) {
            if (result.user) {
              saveInfo(result.user.uid, resolve, reject);
              return;
            }
          }
          reject(null);
        })
        .catch(async (err) => {
          console.log(TAG, err.code);
          const res = await that.app
            .database()
            .collection("users")
            .where("email", "==", email)
            .get();
          if (res.empty) {
            err.uid = "";
          } else {
            const s = res.docs[0];
            err.uid = s.id;
            err.user = s.data();
          }

          if (`${err.code}`.includes("email-already-in-use")) {
            err.code = "Email en uso";
          }
          reject(err);
        });
    };

    return new Promise<string>((resolve, reject) => {
      try {
        create(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  getUser(uid: string) {
    const db = this.app.database();
    // console.log(TAG, "getuser");
    return new Promise<UserType>((resolve, reject) => {
      try {
        db.collection("users")
          .doc(uid)
          .get()
          .then((result) => {
            const data: any = result.data();
            console.log("then", data);
            if (!utils.objects.isEmpty(data)) {
              const user = new UserType(result.id, data);
              resolve(user);
              return;
            }
            resolve(new UserType("", <any>{}));
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
}

export default FireDatabaseUser;
