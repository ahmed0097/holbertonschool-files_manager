import { MongoClient } from ('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}/${database}`;

class DBClient {
    constructor() {
      MongoClient.connect(url, (err, client) => {
        if (!err) {
          this.db = client.db(DB_DATABASE);
        } else {
          this.db = false;
        }
      });
    }

  async isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
