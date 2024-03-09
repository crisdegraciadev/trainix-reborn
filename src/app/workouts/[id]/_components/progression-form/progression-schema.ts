import { activitySchema } from "@typings/schemas/activity";
import { z } from "zod";

export const progressionSchema = z.object({
  activities: z.array(activitySchema).min(1),
  date: z.date(),
});

export type ProgressionFormSchema = z.infer<typeof progressionSchema>;
