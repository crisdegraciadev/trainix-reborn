import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { WorkoutRow } from "@typings/entities/workout";
import { z } from "zod";

export const findWorkoutRows = privateProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }): Promise<WorkoutRow[]> => {
    const { userId } = input;

    return db.workout.findMany({
      where: { userId },
      include: { difficulty: true, muscles: true },
    });
  });
