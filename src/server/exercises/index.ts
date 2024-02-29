import { router } from "@server/trpc";
import { createExercise } from "./procedures/create-exercise";
import { deleteExercise } from "./procedures/delete-exercise";
import { findExerciseRows } from "./procedures/find-exercise-rows";
import { updateExercise } from "./procedures/update-exercise";
import { findExercise } from "./procedures/find-exercise";
import { findExerciseSelectList } from "./procedures/find-exercise-select-list";

export const exercisesRouter = router({
  findExerciseRows,
  findExerciseSelectList,
  findExercise,
  createExercise,
  deleteExercise,
  updateExercise,
});
