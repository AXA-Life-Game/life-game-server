import { MongoClient } from "mongodb";
const mongoUri = process.env.MONGODB_URI;
let client: MongoClient;

export async function connect() {
  try {
    if (!client) {
      if (!mongoUri) throw new Error("MongoDB URI is not provided");
      client = new MongoClient(mongoUri);
      await client.connect();
      console.log("Connected to MongoDB");
    }
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function getDatabase() {
  const client = await connect();
  return client.db("scores");
}

export async function getCollection() {
  const db = await getDatabase();
  return db.collection("player_score");
}

export async function closeConnection() {
  if (client) {
    await client.close();
  }
}
