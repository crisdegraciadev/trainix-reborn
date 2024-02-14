import { router } from "@server/trpc";
import { findAllWorkouts } from "./procedures/find-all-workouts";
import { createWorkout } from "./procedures/create-workout";
import { updateWorkout } from "./procedures/update-workout";

export const workoutsRouter = router({
  findAllWorkouts,
  createWorkout,
  updateWorkout,
});
