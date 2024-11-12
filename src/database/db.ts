import { MongoClient } from "mongodb";
const mongoUri =
  "mongodb://mongo:NripAdsOjSZojgqLZHuxKBBarcotVfpD@autorack.proxy.rlwy.net:18708/life-game";

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
