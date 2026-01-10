import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "ElevateCv";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }
    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }
    mongoose.connection.on("connected", () => {
      console.log("Connected to Database Sucessfully");
    });
    await mongoose.connect(`${mongodbURI}/${projectName}`);
  } catch (error) {
    console.error("Error connecting to MongoDb : ", error);
  }
};

export default connectDB;
