import mongoose from "mongoose";
const uri = "mongodb://127.0.0.1:27017/";
const dbName = "CD_BACKEND";
export default async function mongoConnect() {
  try {
    mongoose.connect(`${uri}${dbName}`);
    console.log("Connected to MongoDB success");
  } catch (e) {
    console.log(e);
    console.log("Error to Connect");
  }
}
