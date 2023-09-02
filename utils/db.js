import mongodb from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;

    const DB = process.env.DB_DATABASE || 'files_manager';
    const DB_URL = `mongodb://${host}:${port}/${DB}`;

    this.client = new mongodb.MongoClient(DB_URL, { useUnifiedTopology: true });
    this.client.isConnected = true;
    this.client.connect()
      .then(() => {
        this.client.isConnected = true;

        this.client.on('close', () => {
          this.client.isConnected = false;
        });
      })
      .catch((err) => {
        console.log('could not connect to MongoDB: ', err);
      });
  }

  isAlive() {
    return this.client.isConnected;
  }

  async nbUsers() {
    try {
      return await this.client.db().collection('users').countDocuments();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async nbFiles() {
    try {
      return await this.client.db().collection('files').countDocuments();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }
}

export const dbClient = new DBClient();
export default DBClient;
