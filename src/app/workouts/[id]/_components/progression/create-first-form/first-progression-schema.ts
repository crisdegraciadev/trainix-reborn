import { activitySchema } from "@typings/schemas/activity";
import { z } from "zod";

export const firstProgressionSchema = z.object({
  date: z.date(),
  activities: z.array(activitySchema).min(1),
});

export type FirstProgressionFormSchema = z.infer<typeof firstProgressionSchema>;
