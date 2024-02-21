import { z } from "zod";

// https://github.dev/mlodyoskar/2023-08-03-dynamic-hook-form/tree/main/src/app
export const workoutActivitySchema = z.object({
  exerciseId: z.number(),
  sets: z.number(),
  reps: z.number(),
});

export type WorkoutActivityFormSchema = z.infer<typeof workoutActivitySchema>;

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
  activities: z.array(workoutActivitySchema).min(1),
});

export type WorkoutFormSchema = z.infer<typeof workoutSchema>;
