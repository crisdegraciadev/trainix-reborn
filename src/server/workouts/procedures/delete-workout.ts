import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { Workout } from "@typings/entities/workout";
import { z } from "zod";

export const deleteWorkout = privateProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }): Promise<Workout> => {
    const { id } = input;

    return db.workout.delete({
      where: { id },
    });
  });
