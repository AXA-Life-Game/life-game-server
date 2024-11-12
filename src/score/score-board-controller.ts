import { Request, Response } from "express";

export const saveScore = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "This is the response from the example controller" });
};
