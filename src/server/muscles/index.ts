import { router } from "@server/trpc";
import { findAllMuscles } from "./procedures/find-all-muscles";

export const musclesRouter = router({
  findAllMuscles,
});
