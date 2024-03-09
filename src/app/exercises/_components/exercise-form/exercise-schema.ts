import { muscleSchema } from "@typings/schemas/muscle";
import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string({ required_error: "Name cannot be blank" }).min(1),
  difficulty: z.string(),
  description: z.string().optional(),
  muscles: z.array(muscleSchema).min(1),
});

export type ExerciseFormSchema = z.infer<typeof exerciseSchema>;
