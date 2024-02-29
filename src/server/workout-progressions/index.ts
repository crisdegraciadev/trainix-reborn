import { router } from "@server/trpc";
import { findWorkoutProgression } from "./procedures/find-workout-progression";

export const workoutProgressionsRouter = router({
  findWorkoutProgression,
});
