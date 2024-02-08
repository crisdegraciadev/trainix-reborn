import { router } from "@server/trpc";
import { findAllDifficulties } from "./procedures/find-all-difficulties";

export const difficultiesRouter = router({
  findAllDifficulties,
});
