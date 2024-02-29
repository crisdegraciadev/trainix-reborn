import { difficultiesRouter } from "./difficulties";
import { exercisesRouter } from "./exercises";
import { musclesRouter } from "./muscles";
import { router } from "./trpc";
import { workoutProgressionsRouter } from "./workout-progressions";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  difficulties: difficultiesRouter,
  exercises: exercisesRouter,
  muscles: musclesRouter,
  workouts: workoutsRouter,
  workoutProgressions: workoutProgressionsRouter,
});

export type AppRouter = typeof appRouter;
