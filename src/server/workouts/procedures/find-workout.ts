import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { WorkoutWithRelations } from "@typings/entities/workout";
import { z } from "zod";

export const findWorkout = privateProcedure
  .input(z.object({ workoutId: z.string() }))
  .query(async ({ input }): Promise<WorkoutWithRelations | null> => {
    const { workoutId: id } = input;

    return db.workout.findUnique({
      where: { id },
      include: {
        difficulty: true,
        muscles: true,
        progressions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  });
