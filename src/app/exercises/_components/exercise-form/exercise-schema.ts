import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string({ required_error: "Name cannot be blank" }).min(1),
  description: z.string().optional(),
  difficulty: z.string(),
  muscles: z
    .array(
      z.object(
        { id: z.string(), value: z.string(), label: z.string() },
        { required_error: "Select at least one muscle" }
      )
    )
    .min(1),
});

export type ExerciseFormSchema = z.infer<typeof exerciseSchema>;
