import { router } from "@server/trpc";
import { createExercise } from "./procedures/create-exercise";
import { deleteExercise } from "./procedures/delete-exercise";
import { findAllExercises } from "./procedures/find-all-exercises";
import { updateExercise } from "./procedures/update-exercise";

export const exercisesRouter = router({
  findAllExercises,
  createExercise,
  deleteExercise,
  updateExercise,
});
