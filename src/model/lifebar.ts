import z from "zod";

const LifebarType = z.enum([
  "AGE",
  "MONEY",
  "CHILDAGE",
  "INCOME",
  "TAX",
  "EXPENSES",
  "THIRDPILLAR",
  "SECONDPILLAR",
]);

const LifebarsSchema = z.array(
  z.object({
    type: LifebarType,
    value: z.number(),
  })
);

export const SubmitScoreSchema = z.object({
  playerId: z.string(),
  lifebars: LifebarsSchema,
});
