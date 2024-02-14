import { difficultiesRouter } from "./difficulties";
import { exercisesRouter } from "./exercises";
import { musclesRouter } from "./muscles";
import { router } from "./trpc";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  difficulties: difficultiesRouter,
  exercises: exercisesRouter,
  muscles: musclesRouter,
  workouts: workoutsRouter,
});

export type AppRouter = typeof appRouter;
