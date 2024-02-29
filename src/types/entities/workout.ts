import {
  Workout as WorkoutModel,
  WorkoutActicity as WorkoutActivityModel,
  WorkoutProgression as WorkoutProgressionModel,
} from "@prisma/client";

import { Difficulty } from "./difficulty";
import { Muscle } from "./muscle";
import { Exercise } from "./exercise";

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

export type WorkoutProgressionDetails = WorkoutProgression & {
  activities: WorkoutActivityDetails[];
};

export type WorkoutActivity = WorkoutActivityModel;

export type WorkoutActivityDetails = WorkoutActivity & {
  exercise: Exercise;
};
