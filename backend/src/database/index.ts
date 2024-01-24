import mongoose from "mongoose";

class Database {
  static connect() {
    const options = 
    mongoose.connect(
      process.env.MONGO_URL || "",
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

export default Database;
