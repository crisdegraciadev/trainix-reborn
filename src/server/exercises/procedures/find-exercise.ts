import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { ExerciseRow } from "@typings/entities/exercise";
import { z } from "zod";

export const findExercise = privateProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }): Promise<ExerciseRow | null> => {
    const { id } = input;

    return db.exercise.findUnique({
      where: { id },
      include: { difficulty: true, muscles: true },
    });
  });
