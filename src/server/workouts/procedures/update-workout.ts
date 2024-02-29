import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";
import { workoutSchema } from "../schemas/workout-schema";
import { Workout } from "@typings/entities/workout";

export const updateWorkout = privateProcedure
  .input(z.object({ id: z.string(), workout: workoutSchema }))
  .mutation(async ({ input }): Promise<Workout> => {
    const { id, workout } = input;
    const { muscles: musclesIds, ...workoutData } = workout;

    return db.workout.update({
      data: {
        ...workoutData,
        muscles: {
          connect: musclesIds,
        },
      },
      where: { id },
    });
  });
