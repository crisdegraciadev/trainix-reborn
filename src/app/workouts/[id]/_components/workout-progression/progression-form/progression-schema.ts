import { activitySchema } from "@typings/schemas/activity";
import { improvementSchema } from "@typings/schemas/improvement";
import { z } from "zod";

export const progressionSchema = z.object({
  date: z.date(),
  improvements: z.array(improvementSchema),
  activities: z.array(activitySchema).min(1),
});

export type ProgressionFormSchema = z.infer<typeof progressionSchema>;
