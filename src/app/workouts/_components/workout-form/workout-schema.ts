import { z } from "zod";

export const workoutSchema = z.object({
  name: z.string({ required_error: "Name cannot be blank" }).min(1),
  difficulty: z.string(),
  description: z.string().optional(),
  muscles: z
    .array(
      z.object(
        { id: z.string(), value: z.string(), name: z.string() },
        { required_error: "Select at least one muscle" }
      )
    )
    .min(1),
});

export type WorkoutFormSchema = z.infer<typeof workoutSchema>;
