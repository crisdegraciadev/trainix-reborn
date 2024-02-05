import db from "../../lib/prisma";
import { publicProcedure } from "../trpc";

export const findAllExercises = publicProcedure.query(async () => {
  return db.muscle.findMany();
});
