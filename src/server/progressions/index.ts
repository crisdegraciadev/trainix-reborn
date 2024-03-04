import { router } from "@server/trpc";
import { findProgression } from "./procedures/find-progression";
import { findCurrentProgression } from "./procedures/find-current-progression";

export const progressionsRouter = router({
  findProgression,
  findCurrentProgression,
});
