import mongoose from "mongoose";

// track the connection
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("DB connected already");
    return;
  }

  const mongodbUri = process.env.NEXT_PUBLIC_MONGODB_URI;
  console.log(process.env.NEXT_PUBLIC_MONGODB_URI);
  if (!mongodbUri) {
    console.error("MONGODB_URI environment variable is not defined.");
    return;
  }

  try {
    await mongoose.connect(mongodbUri, {
      dbName: "courses",
    });
    isConnected = true;
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
