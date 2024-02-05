import { z } from "zod";
import { privateProcedure } from "../trpc";

export const createExercise = privateProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      muscles: z.array(z.object({ value: z.string() })),
    })
  )
  .mutation(async ({ input }) => {
    const { name, description, muscles } = input;
    console.log({ name, description, muscles });
  });
