import App from "../App";
import FireDatabaseGroup from "./group/FireDatabaseGroup";
import FireDatabaseResidents from "./residents/FireDatabaseResidents";
import FirebaseDatabaseRoom from "./room/FirebaseDatabaseRoom";
import FireDatabaseUser from "./user/FireDatabaseUser";

class Database {
  user: FireDatabaseUser;
  residents: FireDatabaseResidents;
  group: FireDatabaseGroup;
  room: FirebaseDatabaseRoom;
  constructor(app: App) {
    this.user = new FireDatabaseUser(app);
    this.residents = new FireDatabaseResidents(app);
    this.group = new FireDatabaseGroup(app);
    this.room = new FirebaseDatabaseRoom(app);
  }
}
export default Database;
