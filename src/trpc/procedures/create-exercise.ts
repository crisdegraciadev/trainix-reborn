import { z } from "zod";
import { privateProcedure } from "../trpc";
import db from "../../lib/prisma";

export const createExercise = privateProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      muscles: z.array(z.object({ id: z.string() })),
      userId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const { name, description, muscles, userId } = input;

    await db.exercise.create({
      data: {
        name,
        description,
        userId,
        muscles: {
          connect: [...muscles],
        },
      },
    });

    console.log({ name, description, muscles });
  });
