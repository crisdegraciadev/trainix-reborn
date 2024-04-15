import { privateProcedure } from "@server/trpc";
import { workoutSchema } from "../schemas/workout-schema";
import { Workout } from "@typings/entities/workout";
import { TRPCError } from "@trpc/server";
import { convertToUTC } from "@utils/convert-to-utc";
import db from "@lib/prisma";

export const createWorkout = privateProcedure
  .input(workoutSchema)
  .mutation(async ({ input }): Promise<Workout> => {
    const { muscles: musclesIds, activities, ...workoutData } = input;

    console.log("Creating new workout", { input });

    const baseWorkout = await db.workout.create({
      data: {
        ...workoutData,
        muscles: {
          connect: [...musclesIds],
        },
      },
    });

    console.log("Workout created", {
      workout: baseWorkout,
    });

    const progressionCreationDate = convertToUTC(new Date());
    progressionCreationDate.setUTCHours(0, 0, 0, 0);

    const { id: workoutId } = baseWorkout;

    const progression = await db.progression.create({
      data: { workoutId, createdAt: progressionCreationDate },
    });

    console.log("Progression created for workout", {
      progression,
      workoutId,
    });

    const { id: progressionId } = progression;

    const createdActivities = await db.acticity.createMany({
      data: activities.map((activity) => ({ progressionId, ...activity })),
    });

    console.log("Activities created for progression", {
      createdActivities,
      progressionId,
      workoutId,
    });

    const workout = db.workout.findUniqueOrThrow({
      where: { id: workoutId },
    });

    // const workout = prisma?.$transaction(async (tx) => {
    //   const workout = await tx.workout.create({
    //     data: {
    //       ...workoutData,
    //       muscles: {
    //         connect: [...musclesIds],
    //       },
    //     },
    //   });
    //
    //   console.log("Workout created", {
    //     workout,
    //   });
    //
    //   const progressionCreationDate = convertToUTC(new Date());
    //   progressionCreationDate.setUTCHours(0, 0, 0, 0);
    //
    //   const progression = await tx.progression.create({
    //     data: { workoutId: workout.id, createdAt: progressionCreationDate },
    //   });
    //
    //   console.log("Progression created for workout", {
    //     progression,
    //     workoutId: workout.id,
    //   });
    //
    //   const { id: progressionId } = progression;
    //
    //   const createdActivities = await tx.acticity.createMany({
    //     data: activities.map((activity) => ({ progressionId, ...activity })),
    //   });
    //
    //   console.log("Activities created for progression", {
    //     createdActivities,
    //     progressionId,
    //     workoutId: workout.id,
    //   });
    //
    //   return tx.workout.findUniqueOrThrow({
    //     where: { id: workout.id },
    //   });
    // });

    if (!workout) {
      throw new TRPCError({ message: "Error creating the workout", code: "BAD_REQUEST" });
    }

    return workout;
  });
