import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createExercise, findAllExercises } from "./procedures";

export const appRouter = router({
  findAllExercises,
  createExercise,
});

export type AppRouter = typeof appRouter;
