import db from "../../lib/prisma";
import { publicProcedure } from "../trpc";

export const findAllMuscles = publicProcedure.query(async () => {
  return db.muscle.findMany();
});
