import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

class MongooseClient {
  private _mongoServer: MongoMemoryServer | null = null; // Testing pourposes
  private _env: string | null;

  constructor(env: string | null = process.env.ENVIRONMENT!){
    this._env = env;
  }
  async connect() {
    let uri: string = "";
    if(!this._env || this._env !== "PRODUCTION"){

        // mongoose.set("debug", true);

      this._mongoServer = await MongoMemoryServer.create();
      uri = this._mongoServer.getUri();
    } else {
      uri = process.env.MONGODB_URL!;
    }
    const options = {
      dbName: process.env.DATABASE,
      minWireVersion: 4
    }

    await mongoose.connect(uri, options);
    if (mongoose.connection.readyState === 1) {
      console.error(`Database connected successfuly: ${uri}`);
    } else {
      console.error(`Could not connect to database: : ${uri}`);
    }
  }

  async disconnect(){
    await mongoose.disconnect();
    if(this._mongoServer){
      await this._mongoServer.stop();
    }
  }

  async dropDatabase(){
    if(this._mongoServer){
      await mongoose.connection.db.dropDatabase();
    }else{
      console.error("Dropping a database is only allowed in testing env")
    }
  }
}

export default MongooseClient;
