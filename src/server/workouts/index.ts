import { router } from "@server/trpc";
import { findWorkoutRows } from "./procedures/find-workout-rows";
import { createWorkout } from "./procedures/create-workout";
import { updateWorkout } from "./procedures/update-workout";
import { deleteWorkout } from "./procedures/delete-workout";

export const workoutsRouter = router({
  findAllWorkouts: findWorkoutRows,
  createWorkout,
  deleteWorkout,
  updateWorkout,
});
