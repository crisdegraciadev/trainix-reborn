import { Workout as WorkoutModel } from "@prisma/client";

import { Difficulty } from "./difficulty";
import { Muscle } from "./muscle";
import { Progression } from "./progression";

export type Workout = WorkoutModel;

export type WorkoutDetails = Workout & {
  difficulty: Difficulty;
  muscles: Muscle[];
  progressions: Progression[];
};

export type WorkoutRow = Workout & {
  difficulty: Difficulty;
  muscles: Muscle[];
};
