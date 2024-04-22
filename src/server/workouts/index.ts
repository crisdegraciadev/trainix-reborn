import { router } from "@server/trpc";
import { createWorkout } from "./procedures/create-workout";
import { deleteWorkout } from "./procedures/delete-workout";
import { findWorkout } from "./procedures/find-workout";
import { findWorkoutRows } from "./procedures/find-workout-rows";
import { updateWorkout } from "./procedures/update-workout";

export const workoutsRouter = router({
  findWorkoutRows,
  findWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
});
