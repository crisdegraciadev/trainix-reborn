import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { SelectItem } from "@typings/utils";

export const findMusclesSelectList = privateProcedure.query(async (): Promise<SelectItem[]> => {
  const data = await db.muscle.findMany();

  return data.map(({ id, name, value }) => ({ id, name, value }));
});
