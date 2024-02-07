import { z } from "zod";
import { privateProcedure } from "../../trpc";
import db from "../../../lib/prisma";

export const createExercise = privateProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      difficultyId: z.string(),
      muscles: z.array(z.object({ id: z.string() })),
      userId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const { name, description, difficultyId, muscles, userId } = input;

    return db.exercise.create({
      data: {
        name,
        description,
        userId,
        difficultyId,
        muscles: {
          connect: [...muscles],
        },
      },
    });
  });
