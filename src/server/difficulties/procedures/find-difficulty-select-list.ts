import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { NameValue } from "@typings/utils";

export const findDifficultySelectList = privateProcedure.query(async (): Promise<NameValue[]> => {
  const data = await db.difficulty.findMany();

  return data
    .toSorted((a, b) => b.level - a.level)
    .toReversed()
    .map(({ id, name, value }) => ({ id, name, value }));
});
