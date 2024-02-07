import { router } from "../../trpc";
import { createExercise } from "./create-exercise";
import { deleteExercise } from "./delete-exercise";
import { findAllExercises } from "./find-all-exercises";

export const exercisesRouter = router({
  findAllExercises,
  createExercise,
  deleteExercise,
});
