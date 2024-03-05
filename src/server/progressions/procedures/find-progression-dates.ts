import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { z } from "zod";

export const findProgressionDates = privateProcedure
  .input(z.object({ workoutId: z.string() }))
  .query(async ({ input }): Promise<Date[]> => {
    const { workoutId } = input;

    const progressions = await db.progression.findMany({
      where: { workoutId },
    });

    return progressions.map(({ createdAt }) => createdAt);
  });
