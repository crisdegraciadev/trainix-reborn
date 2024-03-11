import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { ProgressionPreview } from "@typings/entities/progression";
import { z } from "zod";

export const findProgression = privateProcedure
  .input(z.object({ id: z.string(), date: z.string().optional() }))
  .query(async ({ input }): Promise<ProgressionPreview | null> => {
    const { id, date } = input;

    return db.progression.findUnique({
      where: { id, createdAt: date },
      include: {
        activities: { include: { exercise: true, improve: true } },
      },
    });
  });
