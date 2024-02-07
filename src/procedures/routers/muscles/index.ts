import { router } from "../../trpc";
import { findAllMuscles } from "./find-all-muscles";

export const musclesRouter = router({
  findAllMuscles,
});
