import express, {Request, Response} from "express";
import {getCollection} from "../database/db";
import {PlayerScoreSchema} from "../model/player-score";

export const scoreBoardController = express.Router();

scoreBoardController.get("/scores", async (req: Request, res: Response) => {
        try {
            const collection = await getCollection();
            const topScores = await collection.find({}).toArray();
            res.status(200)
                .json(topScores);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
);

scoreBoardController.get("/scores/top", async (req: Request, res: Response) => {
        const limit = Number(req.query.limit) || 5;

        try {
            const collection = await getCollection();
            const topScores = await collection.find({}).sort({score: -1}).limit(limit).toArray();
            res.status(200)
                .json(topScores);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
);

scoreBoardController.get("/score", async (req: Request, res: Response) => {
        const playerId = req.query.playerId;

        try {
            const collection = await getCollection();
            const topScores = await collection.find({playerId}).sort({score: -1}).limit(1).toArray();

            res.status(200)
                .json(topScores);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
);

scoreBoardController.post("/score", async (req: Request, res: Response) => {
        try {
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