import { router } from "./trpc";
import { difficultiesRouter } from "./routers/difficulties";
import { exercisesRouter } from "./routers/exercises";
import { musclesRouter } from "./routers/muscles";

export const appRouter = router({
  difficulties: difficultiesRouter,
  exercises: exercisesRouter,
  muscles: musclesRouter,
});

export type AppRouter = typeof appRouter;
