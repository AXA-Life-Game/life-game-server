import express from "express";
import {connect} from "./src/database/db";
import scoreBoardController from "./src/score/score-board-controller";
// @ts-ignore
import cors from "cors";

const app = express();
const port = process.env.PORT || 3005;

(async () => {
    try {
        await connect();
        console.log("Connected to MongoDB");

        app.use(cors());
        app.use(express.json());
        app.use("/", scoreBoardController);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
})();
