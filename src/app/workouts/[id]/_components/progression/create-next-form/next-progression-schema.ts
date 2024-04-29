import { activitySchema } from "@typings/schemas/activity";
import { improvementSchema } from "@typings/schemas/improvement";
import { z } from "zod";

export const nextProgressionSchema = z.object({
  date: z.date(),
  improvements: z.array(improvementSchema),
  activities: z.array(activitySchema).min(1),
});

export type NextProgressionFormSchema = z.infer<typeof nextProgressionSchema>;
