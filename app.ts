import express, { Request, Response } from "express";
import { exampleController } from "./src/score/score-board-controller";
import { connectToMongoDB } from "./src/database/db";

const app = express();
const port = process.env.PORT || 3005;

(async () => {
  try {
    await connectToMongoDB();
    console.log("Connected to MongoDB");

    app.get("/", (_: Request, res: Response) => {
      res.send("Hello, World!");
    });

    app.get("/example", exampleController);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
