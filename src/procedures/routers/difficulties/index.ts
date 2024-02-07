import { router } from "../../trpc";
import { findAllDifficulties } from "./find-all-difficulties";

export const difficultiesRouter = router({
  findAllDifficulties,
});
