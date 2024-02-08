import { difficultiesRouter } from "./difficulties";
import { exercisesRouter } from "./exercises";
import { musclesRouter } from "./muscles";
import { router } from "./trpc";

export const appRouter = router({
  difficulties: difficultiesRouter,
  exercises: exercisesRouter,
  muscles: musclesRouter,
});

export type AppRouter = typeof appRouter;
