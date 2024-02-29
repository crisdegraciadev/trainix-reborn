import { router } from "@server/trpc";
import { findDifficultySelectList } from "./procedures/find-difficulty-select-list";

export const difficultiesRouter = router({
  findDifficultySelectList,
});
