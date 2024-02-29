import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { workoutSchema } from "../schemas/workout-schema";
import { Workout } from "@typings/entities/workout";

export const createWorkout = privateProcedure.input(workoutSchema).mutation(async ({ input }): Promise<Workout> => {
  const { muscles: musclesIds, activities, ...workoutData } = input;

  const workout = await db.workout.create({
    data: {
      ...workoutData,
      muscles: {
        connect: [...musclesIds],
      },
    },
  });

  const { id: workoutProgressionId } = await db.workoutProgression.create({ data: { workoutId: workout.id } });

  await db.workoutActicity.createMany({
    data: activities.map((activity) => ({ workoutProgressionId, ...activity })),
  });

  return db.workout.findUniqueOrThrow({
    where: { id: workout.id },
  });
});
