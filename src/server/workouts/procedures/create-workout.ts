import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { Workout } from "@typings/entities/workout";
import { workoutSchema } from "../schemas/workout-schema";

export const createWorkout = privateProcedure
  .input(workoutSchema)
  .mutation(async ({ input }): Promise<Workout> => {
    const { muscles: musclesIds, ...workoutData } = input;

    console.log("Creating new workout", { input });

    const workout = await db.workout.create({
      data: {
        ...workoutData,
        muscles: {
          connect: [...musclesIds],
        },
      },
    });

    console.log("Workout created", { workout });

    if (!workout) {
      throw new TRPCError({ message: "Error creating the workout", code: "BAD_REQUEST" });
    }

    return workout;
  });
