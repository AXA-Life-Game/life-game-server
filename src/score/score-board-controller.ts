import express, { Request, Response } from "express";
import { getCollection } from "../database/db";
import { PlayerScoreSchema } from "../model/score";
import { SubmitScoreSchema } from "../model/lifebar";

export const scoreBoardController = express.Router();

scoreBoardController.get("/scores", async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const topScores = await collection.find({}).toArray();
    res.status(200).json(topScores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

scoreBoardController.get("/scores/top", async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const collection = await getCollection();
    const topScores = await collection
      .find({})
      .sort({ score: -1 })
      .limit(limit)
      .toArray();
    res.status(200).json(topScores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

scoreBoardController.get("/score", async (req: Request, res: Response) => {
  try {
    const playerId = req.query.playerId;
    if (!playerId) {
      res.status(400).json({ message: "Player ID is required" });
      return;
    }
    const collection = await getCollection();
    const topScores = await collection.findOne(
      { playerId },
      { sort: { score: -1 } }
    );
    res.status(200).json(topScores);
    if (topScores === null) {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

scoreBoardController.post("/score", async (req: Request, res: Response) => {
  try {
    const dto = SubmitScoreSchema.parse(req.body);
    const calculatedLifebars = dto.lifebars
      .filter(
        (lifebar) =>
          lifebar.type === "THIRDPILLAR" || lifebar.type === "SECONDPILLAR"
      )
      .reduce((acc, lifebar) => {
        return acc + lifebar.value;
      }, 0);
    const scoreData = PlayerScoreSchema.parse({
      playerId: dto.playerId,
      score: calculatedLifebars,
    });
    console.log(scoreData);
    const collection = await getCollection();
    await collection.insertOne(scoreData);
    res.status(200).json(scoreData);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default scoreBoardController;
