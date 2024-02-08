import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const deleteExercise = privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
  const { id } = input;

  return db.exercise.delete({ where: { id } });
});
