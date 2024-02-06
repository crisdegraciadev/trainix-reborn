import { z } from "zod";
import db from "../../lib/prisma";
import { privateProcedure } from "../trpc";

export const findAllExercises = privateProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const { userId } = input;

    return db.exercise.findMany({
      where: { userId },
      include: { muscles: true },
    });
  });
