import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";

export const findAllDifficulties = privateProcedure.query(async () => {
  return db.difficulty.findMany();
});
