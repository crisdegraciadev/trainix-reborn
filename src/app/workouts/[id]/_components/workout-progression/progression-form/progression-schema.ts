import { activitySchema } from "@typings/schemas/activity";
import { z } from "zod";

const improvementSchema = z.object({
  exerciseId: z.string(),
  name: z.string(),
  improve: z.union([z.literal("+"), z.literal("="), z.literal("-")]),
});

export const progressionSchema = z.object({
  date: z.date(),
  improvements: z.array(improvementSchema),
  activities: z.array(activitySchema).min(1),
});

export type ProgressionFormSchema = z.infer<typeof progressionSchema>;

export type ImprovementSchema = z.infer<typeof improvementSchema>;
