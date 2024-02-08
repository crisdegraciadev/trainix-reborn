import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  difficultyId: z.string(),
  muscles: z.array(z.object({ id: z.string() })),
  userId: z.string(),
});
