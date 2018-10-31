import { Db, MongoClient } from 'mongodb';

const connStr = 'mongodb://cloudvps:27017';
const dbName = "todo1";

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static getConnection(result: (connection) => void) {
    if (this.isConnected) {
      return result(this.db);
    } else {
      this.connect((error, db: Db) => {
        return result(this.db);
      });
    }
  }

  private static connect(result: (error, db: Db) => void) {
    MongoClient.connect(connStr, (err, client) => {
      console.log("mongo error: ", err);
      this.db = client.db(dbName);
      this.isConnected = true;
      return result(err, this.db);
    });
  }
}
