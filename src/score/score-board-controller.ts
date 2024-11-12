import express, {Request, Response} from "express";
import {getCollection} from "../database/db";
import {PlayerScoreSchema} from "../model/player-score";

export const scoreBoardController = express.Router();

scoreBoardController.get("/scores", async (req: Request, res: Response) => {
        res
            .status(200)
            .json({message: "This is the response from the example controller"});
    }
);

scoreBoardController.post("/score", async (req: Request, res: Response) => {
        try {
            console.log(req);
            const scoreData = PlayerScoreSchema.parse(req.body);
            const collection = await getCollection();
            await collection.insertOne(scoreData);
            res.status(200).json(scoreData);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
);

export default scoreBoardController;