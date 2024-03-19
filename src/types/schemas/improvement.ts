import { z } from "zod";

export const improvementSchema = z.object({
  exerciseId: z.string(),
  activityId: z.string(),
  name: z.string(),
  sets: z.number(),
  reps: z.number(),
  improve: z.union([z.literal("+"), z.literal("="), z.literal("-")]),
});

export type ImprovementSchema = z.infer<typeof improvementSchema>;
