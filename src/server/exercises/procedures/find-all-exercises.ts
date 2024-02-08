import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const findAllExercises = privateProcedure.input(z.object({ userId: z.string() })).query(async ({ input }) => {
  const { userId } = input;

  return db.exercise.findMany({
    where: { userId },
    include: { difficulty: true, muscles: true },
  });
});
