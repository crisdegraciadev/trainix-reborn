import { router } from "@server/trpc";
import { findProgression } from "./procedures/find-progression";
import { findCurrentProgression } from "./procedures/find-current-progression";
import { findProgressionDates } from "./procedures/find-progression-dates";
import { createProgression } from "./procedures/create-progression";

export const progressionsRouter = router({
  findProgression,
  findCurrentProgression,
  findProgressionDates,
  createProgression,
});
