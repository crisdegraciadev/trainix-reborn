import { activitySchema } from "@typings/schemas/activity";
import { z } from "zod";

export const workoutSchema = z.object({
  name: z.string(),
  difficultyId: z.string(),
  description: z.string().optional(),
  muscles: z.array(z.object({ id: z.string() })),
  userId: z.string(),
});
