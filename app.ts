import express, { Request, Response } from "express";
import { saveScore } from "./src/score/score-board-controller";
import { connect } from "./src/database/db";

const app = express();
const port = process.env.PORT || 3005;

(async () => {
  try {
    await connect();
    console.log("Connected to MongoDB");

    app.get("/", (_: Request, res: Response) => {
      res.send("Hello, World!");
    });

    app.get("/example", saveScore);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
