import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { exerciseSchema } from "../schemas/exercise-schema";

export const createExercise = privateProcedure.input(exerciseSchema).mutation(async ({ input }) => {
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
