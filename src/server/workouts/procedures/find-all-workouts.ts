import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const findAllWorkouts = privateProcedure.input(z.object({ userId: z.string() })).query(async ({ input }) => {
  const { userId } = input;

  return db.workout.findMany({
    where: { userId },
    include: { difficulty: true, muscles: true },
  });
});
