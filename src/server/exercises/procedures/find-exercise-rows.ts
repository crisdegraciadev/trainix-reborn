import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { ExerciseRow } from "@typings/entities/exercise";
import { z } from "zod";

export const findExerciseRows = privateProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }): Promise<ExerciseRow[]> => {
    const { userId } = input;

    const data = await db.exercise.findMany({
      where: { userId },
      include: { difficulty: true, muscles: true },
    });

    return data.map(({ difficulty, muscles, ...rest }) => {
      const { level, ...difficultyRest } = difficulty;

      return {
        ...rest,
        difficulty: { ...difficultyRest },
        muscles: muscles.map(({ id, name, value }) => ({ id, name, value })),
      };
    });
  });
