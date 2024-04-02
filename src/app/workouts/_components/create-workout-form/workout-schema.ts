import { activitySchema } from "@typings/schemas/activity";
import { muscleSchema } from "@typings/schemas/muscle";
import { z } from "zod";

export const workoutSchema = z.object({
  name: z.string({ required_error: "Name cannot be blank" }).min(1),
  difficultyId: z.string(),
  description: z.string().optional(),
  muscles: z.array(muscleSchema).min(1),
  activities: z.array(activitySchema),
});

export type WorkoutFormSchema = z.infer<typeof workoutSchema>;
