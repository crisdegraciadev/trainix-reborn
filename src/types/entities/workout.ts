import { Workout as WorkoutModel } from "@prisma/client";

import { Difficulty } from "./difficulty";
import { Muscle } from "./muscle";
import { Progression } from "./progression";

export type Workout = WorkoutModel;

export type WorkoutWithRelations = Workout & {
  difficulty: Difficulty;
  muscles: Muscle[];
  progressions: Progression[];
};

export type WorkoutRow = Workout & {
  description?: string | null;
  difficulty: Difficulty;
  muscles: Muscle[];
};
