import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { SelectItem } from "@typings/utils";
import { z } from "zod";

export const findExerciseSelectList = privateProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }): Promise<SelectItem[]> => {
    const { userId } = input;

    const data = await db.exercise.findMany({
      where: { userId },
    });

    return data.map(({ id, name }) => ({ id, value: id, name }));
  });
