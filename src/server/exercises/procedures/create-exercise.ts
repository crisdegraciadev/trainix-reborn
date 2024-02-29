import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { exerciseSchema } from "../schemas/exercise-schema";
import { Exercise } from "@prisma/client";

export const createExercise = privateProcedure.input(exerciseSchema).mutation(async ({ input }): Promise<Exercise> => {
  const { muscles: musclesIds, ...exerciseData } = input;

  return db.exercise.create({
    data: {
      ...exerciseData,
      muscles: {
        connect: [...musclesIds],
      },
    },
  });
});
