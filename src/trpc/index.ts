import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createExercise, findAllExercises, findAllMuscles } from "./procedures";

export const appRouter = router({
  findAllExercises,
  findAllMuscles,
  createExercise,
});

export type AppRouter = typeof appRouter;
