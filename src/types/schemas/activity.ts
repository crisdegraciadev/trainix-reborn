import { z } from "zod";

export const activitySchema = z.object({
  exerciseId: z.string().min(1),
  sets: z.coerce.number({
    required_error: "All exercises must be filled",
    invalid_type_error: "Sets must be a number",
  }),
  reps: z.coerce.number({
    required_error: "All exercises must be filled",
    invalid_type_error: "Reps must be a number",
  }),
  order: z.number(),
});

export type ActivityFormSchema = z.infer<typeof activitySchema>;
