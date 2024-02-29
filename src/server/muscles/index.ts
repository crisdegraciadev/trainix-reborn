import { router } from "@server/trpc";
import { findMusclesSelectList } from "./procedures/find-all-muscles";

export const musclesRouter = router({
  findMusclesSelectList,
});
