import { router } from "./trpc";
import { createExercise, deleteExercise, findAllDifficulties, findAllExercises, findAllMuscles } from "./procedures";

export const appRouter = router({
  findAllExercises,
  findAllMuscles,
  findAllDifficulties,
  createExercise,
  deleteExercise,
});

export type AppRouter = typeof appRouter;
