import db from "@lib/prisma";
import { Exercise } from "@prisma/client";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const deleteExercise = privateProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }): Promise<Exercise> => {
    const { id } = input;

    return db.exercise.delete({
      where: { id },
    });
  });
