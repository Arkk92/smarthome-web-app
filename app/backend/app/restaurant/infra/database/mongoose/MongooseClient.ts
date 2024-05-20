import mongoose from "mongoose";

class MongooseClient {
  connect() {
    mongoose.connect(
      process.env.MONGODB_URL || "",
      {
        dbName: process.env.DATABASE,
      }).then(
        () => {
          if (mongoose.connection.readyState === 1) {
            console.error("Database connected successfuly");
          } else {
            console.log("Could not connect to database");
          }
        }
      );
  }
}

export default MongooseClient;
