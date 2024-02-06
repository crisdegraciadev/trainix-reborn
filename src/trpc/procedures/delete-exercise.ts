import { z } from "zod";
import { privateProcedure } from "../trpc";
import db from "../../lib/prisma";

export const deleteExercise = privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
  const { id } = input;

  return db.exercise.delete({ where: { id } });
});
