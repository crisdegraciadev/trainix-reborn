import db from "../../lib/prisma";
import { privateProcedure } from "../trpc";

export const findAllDifficulties = privateProcedure.query(async () => {
  return db.difficulty.findMany();
});
