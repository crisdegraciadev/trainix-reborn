import { z } from "zod";

export const workoutSchema = z.object({
  name: z.string(),
  difficultyId: z.string(),
  description: z.string().optional(),
  muscles: z.array(z.object({ id: z.string() })),
  userId: z.string(),
  date: z.date(),
  activities: z.array(
    z.object({
      exerciseId: z.string().min(1),
      order: z.number(),
      sets: z.number(),
      reps: z.number(),
    }),
  ),
});
