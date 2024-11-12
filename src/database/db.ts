import { MongoClient } from "mongodb";
const mongoUri =
  "mongodb+srv://lucykowalski10:psw@cluster0.ym5dd.mongodb.net/scores?retryWrites=true&w=majority&appName=Cluster0";

export async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db();
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
