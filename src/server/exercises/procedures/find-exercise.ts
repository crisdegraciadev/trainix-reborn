import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const findExercise = privateProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
  const { id } = input;

  return db.exercise.findMany({
    where: { id },
    include: { difficulty: true, muscles: true },
  });
});
