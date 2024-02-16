import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const deleteWorkout = privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
  const { id } = input;

  return db.workout.delete({ where: { id } });
});
