import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const findWorkoutProgression = privateProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
  const { id } = input;

  return db.workoutProgression.findUnique({
    where: { id },
    include: {
      activities: { include: { exercise: true } },
    },
  });
});
