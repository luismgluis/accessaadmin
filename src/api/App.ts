import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";
import Database from "./database/Database";

const TAG = "APP";
class App {
  private _me: firebase.User | null;
  private _fireProject: firebase.app.App | null;
  private _onUserChangeCallBack: (user: firebase.User | null) => void;
  private _databaseFns: Database | null;
  static instance: any;
  constructor() {
    this._me = null;
    this._fireProject = null;
    this._onUserChangeCallBack = () => null;
    this._databaseFns = null;
    if (typeof App.instance === "object") {
      return App.instance;
    }
    App.instance = this;
    if (firebase.apps.length === 0 || this._fireProject === null) {
      this._fireProject = firebase.initializeApp(firebaseConfig);
    }
    this._getCurrentUser();
  }

  public get databaseFns(): Database {
    return this._databaseFns!;
  }

  public set databaseFns(v: Database) {
    this._databaseFns = v;
  }

  database() {
    return this._fireProject?.firestore()!;
  }
  auth() {
    return this._fireProject?.auth()!;
  }
  storage() {
    return this._fireProject?.storage()!;
  }
  me() {
    return this._me;
  }
  getCurrentUser(callBack: (user: firebase.User | null) => void) {
    this._onUserChangeCallBack = callBack;
  }
  private _getCurrentUser() {
    this.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user is logged");
        this._me = user;
        this._onUserChangeCallBack(user);
        return;
      }
      this._me = null;
      this._onUserChangeCallBack(null);
    });
  }
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth().languageCode = "es";

    const action = (
      resolve: (val: boolean) => void,
      reject: (err: string) => void
    ) => {
      this.auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(TAG, result);
          const credential = result.credential;
          if (credential !== null) {
            console.log(TAG, credential);
            //const user = result.user;
            resolve(true);
          }
          resolve(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(TAG, errorCode, errorMessage);
          reject(errorMessage);
        });
    };
    const setPersistence = (
      resolve: (val: boolean) => void,
      reject: (err: string) => void
    ) => {
      this.auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return this.auth()
            .signInWithPopup(provider)
            .then((result) => {
              console.log(TAG, result);
              const credential = result.credential;
              if (credential !== null) {
                console.log(TAG, credential);
                //const user = result.user;
                resolve(true);
              }
              resolve(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(TAG, errorCode, errorMessage);
              reject(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(TAG, errorCode, errorMessage);
          reject(errorMessage);
        });
    };
    return new Promise<boolean>((resolve, reject) => {
      try {
        setPersistence(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  loginWithEmail(email: string, password: string) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this.auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(TAG, user);
            resolve(true);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(errorMessage + " " + errorCode);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  logOut() {
    return this.auth().signOut();
  }
}
export default App;
