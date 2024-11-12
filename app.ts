import express from "express";
import {closeConnection, connect} from "./src/database/db";
import scoreBoardController from "./src/score/score-board-controller";
// @ts-ignore
import cors from "cors";

const app = express();
const port = process.env.PORT || 3005;

connect().catch(
    (error) => {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    });
console.log("Connected to MongoDB");

app.use(cors());
app.use(express.json());
app.use("/", scoreBoardController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
process.on('beforeExit', closeConnection)
process.on('SIGINT', async function () {
    console.log('Caught interrupt signal');
    await closeConnection();
    process.exit();
})