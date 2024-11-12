import express, { Request, Response } from "express";
import { exampleController } from "./src/score/score-board-controller";

const app = express();
const port = process.env.PORT || 3005;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/example", exampleController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
