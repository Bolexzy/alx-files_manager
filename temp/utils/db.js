import { MongoClient, ObjectId } from 'mongodb';
import { env } from 'process';

class DBClient {
  constructor(host = '127.0.0.1', port = 27017, database = 'files_manager') {
    this.host = host;
    this.port = port;
    this.database = database;
    this.url = `mongodb://${this.host}:${this.port}`;
    this.isConnected = false;
    this.ObjectId = ObjectId;

    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.isConnected = true;
        this.db = this.client.db(this.database);

        this.client.on('close', () => {
          this.isConnected = false;
        });

        this.client.on('reconnect', () => {
          this.isConnected = true;
        });
      })
      .catch((err) => {
        console.log('could not connect to MongoDB: ', err);
      });
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    try {
      return await this.db.collection('users').countDocuments();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async nbFiles() {
    try {
      return await this.db.collection('files').countDocuments();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async addNew(collectionName, document) {
    try {
      const db = this.client.db(this.database);
      const collection = db.collection(collectionName);
      const resp = await collection.insertOne(document);
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  async findOne(collectionName, document) {
    try {
      const db = this.client.db(this.database);
      const collection = db.collection(collectionName);
      const result = await collection.findOne(documentDetail);
    } catch (err) {
      console.log(err);
    }
    return result;
  }
}

export default new DBClient(env.DB_HOST, env.DB_PORT, env.DB_DATABASE);
