import { MongoClient } from 'mongodb';

// Represent client using MangoDB

class DBClient {
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    this.host = DB_HOST;
    this.port = DB_PORT;
    this.database = DB_DATABASE;

    const url = `mongodb://${this.host}:${this.port}/${this.database}`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error(`DB Connection Error: ${err}`);
        return;
      }
      this.db = client.db(this.database);
    });
  }
// checks if client connection to MongoDB server is alive
  is0Alive() {
    return !!this.db;
  }0

  async nbUsers() {
    if (!this.isAlive()) return 0; // retrieves number of user in database

    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.isAlive()) return 0;

    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
