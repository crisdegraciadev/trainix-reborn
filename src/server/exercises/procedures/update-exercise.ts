import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";
import { exerciseSchema } from "../schemas/exercise-schema";
import { Exercise } from "@prisma/client";

export const updateExercise = privateProcedure
  .input(z.object({ id: z.string(), exercise: exerciseSchema }))
  .mutation(async ({ input }): Promise<Exercise> => {
    const { id, exercise } = input;
    const { muscles: musclesIds, ...exerciseData } = exercise;

    return db.exercise.update({
      data: {
        ...exerciseData,
        muscles: {
          connect: musclesIds,
        },
      },
      where: { id },
    });
  });
