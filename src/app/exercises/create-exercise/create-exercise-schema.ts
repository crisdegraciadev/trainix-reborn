import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string({ required_error: "Name cannot be blank" }),
  description: z.string().optional(),
  muscles: z.array(z.object({ value: z.string(), label: z.string() })),
});

export type CreateExerciseFormSchema = z.infer<typeof createExerciseSchema>;
