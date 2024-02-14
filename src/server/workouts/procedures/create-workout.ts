import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { workoutSchema } from "../schemas/workout-schema";

export const createWorkout = privateProcedure.input(workoutSchema).mutation(async ({ input }) => {
  const { muscles: musclesIds, ...workoutData } = input;

  return db.workout.create({
    data: {
      ...workoutData,
      muscles: {
        connect: [...musclesIds],
      },
    },
  });
});
