import utils from "../../../libs/utils/utils";
import GroupType from "../../../types/GroupType";
import { ResidentAccess } from "../../../types/ResidentAccess";
import ResidentType from "../../../types/ResidentType";
import UserType from "../../../types/UserType";
import App from "../../App";
type AccessWithUser = {
  validator: ResidentType;
  access: ResidentAccess;
  resident: ResidentType;
  officer?: UserType;
};
const TAG = "FIRE DATABASE RESIDENTS";
class FireDatabaseResidents {
  app: App;
  constructor(app: App) {
    this.app = app;
  }
  getResidentById(group: GroupType, id: string) {
    const db = this.app.database();
    console.log(TAG, "getuser");
    return new Promise<ResidentType>((resolve, reject) => {
      try {
        db.collection("groups")
          .doc(group.id)
          .collection("residents")
          .doc(id)
          .get()
          .then((result) => {
            if (result.exists) {
              resolve(new ResidentType(result.id, <any>result.data()));
              return;
            }
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

  getResidents(group: GroupType) {
    const db = this.app.database();
    console.log(TAG, "getuser");
    return new Promise<ResidentType[]>((resolve, reject) => {
      try {
        db.collection("groups")
          .doc(group.id)
          .collection("residents")
          .get()
          .then((result) => {
            const data: ResidentType[] = [];
            if (result.empty) {
              resolve([]);
              return;
            }
            result.forEach((doc) =>
              data.push(new ResidentType(doc.id, <any>doc.data()))
            );
            resolve(data);
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
  getResidentAccess(group: GroupType, resi: ResidentType, limit: number = 100) {
    const db = this.app.database();
    console.log(TAG, "getuser");
    return new Promise<ResidentAccess[]>((resolve, reject) => {
      try {
        db.collection("groups")
          .doc(group.id)
          .collection("access")
          .where("idResident", "==", resi.id)
          .orderBy("creationDate", "desc")
          .limit(100)
          .get()
          .then((data) => {
            const result: Array<ResidentAccess> = [];
            data.forEach((doc) => {
              result.push(new ResidentAccess(doc.id, <any>doc.data()));
            });
            if (result.length > 0) {
              resolve(result);
              return;
            }
            resolve([]);
          })
          .catch((error) => {
            console.log(TAG, error);
            reject(error);
          });
      } catch (error) {
        reject(null);
      }
    });
  }

  getResidentAccessWithUserType(
    group: GroupType,
    resi: ResidentType,
    limit: number = 100,
    dateMin: number | null = null,
    dateMax: number | null = null
  ) {
    const that = this;
    const db = this.app.database();
    console.log(TAG, "getuser");

    const resolveValidators = async (arrAccess: ResidentAccess[]) => {
      const arrVali: any = {};
      const arrResi: any = {};
      arrAccess.forEach((item) => {
        arrVali[item.idValidator] = true;
        arrResi[item.idResident] = true;
      });

      const result: Array<AccessWithUser> = [];

      // for (const idUser in arrVali) {
      //   if (typeof arrVali[idUser] === "boolean") {
      //     const data = await this.app.databaseFns.user
      //       .getUser(idUser)
      //       .catch(() => null);
      //     if (data) {
      //       arrVali[idUser] = data;
      //     }
      //   }
      // }

      for (const idUser in arrVali) {
        if (typeof arrVali[idUser] === "boolean") {
          const data = await that
            .getResidentById(group, idUser)
            .catch(() => null);

          if (data) {
            arrVali[idUser] = data;
          }
        }
      }

      for (const idUser in arrResi) {
        if (typeof arrResi[idUser] === "boolean") {
          const data = await that
            .getResidentById(group, idUser)
            .catch(() => null);

          if (data) {
            arrResi[idUser] = data;
          }
        }
      }

      arrAccess.forEach((acc) => {
        result.push({
          access: acc,
          validator: arrVali[acc.idValidator],
          resident: arrResi[acc.idResident],
        });
      });

      return result;
    };

    return new Promise<AccessWithUser[]>((resolve, reject) => {
      try {
        let query = db
          .collection("groups")
          .doc(group.id)
          .collection("access")
          .where("creationDate", ">", 0);

        if (!resi.isEmpty()) {
          query = db
            .collection("groups")
            .doc(group.id)
            .collection("access")
            .where("idResident", "==", resi.id);
        }

        if (dateMin !== null && dateMax !== null) {
          const mx = dateMax + 86400;
          query = query
            .where("creationDate", ">=", dateMin)
            .where("creationDate", "<=", mx);
        }

        query
          .orderBy("creationDate", "desc")
          .limit(limit)
          .get()
          .then(async (data) => {
            const result: Array<ResidentAccess> = [];
            data.forEach((doc) => {
              result.push(new ResidentAccess(doc.id, <any>doc.data()));
            });
            if (result.length > 0) {
              const res = await resolveValidators(result);
              resolve(res);
              return;
            }
            resolve([]);
          })
          .catch((error) => {
            console.log(TAG, error);
            reject(error);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
}

export default FireDatabaseResidents;
