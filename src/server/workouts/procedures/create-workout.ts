import { privateProcedure } from "@server/trpc";
import { workoutSchema } from "../schemas/workout-schema";
import { Workout } from "@typings/entities/workout";
import { TRPCError } from "@trpc/server";
import { convertToUTC } from "@utils/convert-to-utc";

export const createWorkout = privateProcedure
  .input(workoutSchema)
  .mutation(async ({ input }): Promise<Workout> => {
    const { muscles: musclesIds, activities, ...workoutData } = input;

    const workout = prisma?.$transaction(async (tx) => {
      const workout = await tx.workout.create({
        data: {
          ...workoutData,
          muscles: {
            connect: [...musclesIds],
          },
        },
      });

      const progressionCreationDate = convertToUTC(new Date());
      progressionCreationDate.setUTCHours(0, 0, 0, 0);

      const { id: progressionId } = await tx.progression.create({
        data: { workoutId: workout.id, createdAt: progressionCreationDate },
      });

      const improveState = await tx.improve.findUnique({ where: { name: "Keep working" } });

      if (!improveState) {
        throw new TRPCError({
          message: "Default improve state not found",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      const { id: improveId } = improveState;

      await tx.acticity.createMany({
        data: activities.map((activity) => ({ progressionId, ...activity })),
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
