import {
  Workout as WorkoutModel,
  WorkoutActicity as WorkoutActivityModel,
  WorkoutProgression as WorkoutProgressionModel,
} from "@prisma/client";

import { Difficulty } from "./difficulty";
import { Muscle } from "./muscle";

export type Workout = WorkoutModel;

export type WorkoutDetails = Workout & {
  difficulty: Difficulty;
  muscles: Muscle[];
  progressions: WorkoutProgression[];
};

export type WorkoutRow = Workout & {
  difficulty: Difficulty;
  muscles: Muscle[];
};

type WorkoutProgression = WorkoutProgressionModel;
