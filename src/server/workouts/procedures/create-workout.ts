import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { Workout } from "@typings/entities/workout";
import { parseISO } from "date-fns";
import { workoutSchema } from "../schemas/workout-schema";

export const createWorkout = privateProcedure
  .input(workoutSchema)
  .mutation(async ({ input }): Promise<Workout> => {
    const { muscles: musclesIds, activities, date, ...workoutData } = input;

    console.log("Creating new workout", { input });

    const workout = db.$transaction(async (tx) => {
      const workout = await tx.workout.create({
        data: {
          ...workoutData,
          muscles: {
            connect: [...musclesIds],
          },
        },
      });

      console.log("Workout created", { workout });

      const progressionCreationDate = parseISO(date);
      progressionCreationDate.setUTCHours(0, 0, 0, 0);

      const progression = await tx.progression.create({
        data: { workoutId: workout.id, createdAt: progressionCreationDate },
      });

      console.log("Progression created for workout", {
        progression,
        workoutId: workout.id,
      });

      const { id: progressionId } = progression;

      const createdActivities = await tx.acticity.createMany({
        data: activities.map((activity) => ({ progressionId, ...activity })),
      });

      console.log("Activities created for progression", {
        createdActivities,
        progressionId,
        workoutId: workout.id,
      });

      return tx.workout.findUniqueOrThrow({
        where: { id: workout.id },
      });
    });

    if (!workout) {
      throw new TRPCError({ message: "Error creating the workout", code: "BAD_REQUEST" });
    }

    return workout;
  });
