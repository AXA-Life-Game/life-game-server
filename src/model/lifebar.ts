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

export const LifebarsSchema = z.array(
  z.object({
    type: LifebarType,
    value: z.number(),
  })
);
