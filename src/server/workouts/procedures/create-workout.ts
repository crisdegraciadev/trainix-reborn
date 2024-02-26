import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { workoutSchema } from "../schemas/workout-schema";

export const createWorkout = privateProcedure.input(workoutSchema).mutation(async ({ input }) => {
  const { muscles: musclesIds, activities, ...workoutData } = input;

  const { id: workoutId } = await db.workout.create({
    data: {
      ...workoutData,
      muscles: {
        connect: [...musclesIds],
      },
    },
  });

  const { id: workoutProgressionId } = await db.workoutProgression.create({ data: { workoutId } });

  return db.workoutActicity.createMany({
    data: activities.map((activity) => ({ workoutProgressionId, ...activity })),
  });
});
