import db from "../../../lib/prisma";
import { privateProcedure } from "../../trpc";

export const findAllMuscles = privateProcedure.query(async () => {
  return db.muscle.findMany();
});
