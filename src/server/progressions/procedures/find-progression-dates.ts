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

    console.log(
      progressions.map(({ createdAt }) => createdAt).toSorted((a, b) => a.getTime() - b.getTime())
    );

    return progressions.map(({ createdAt }) => createdAt);
  });
