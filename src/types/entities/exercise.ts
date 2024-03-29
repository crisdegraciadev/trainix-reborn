import { Exercise as ExerciseModel } from "@prisma/client";
import { Difficulty } from "./difficulty";
import { Muscle } from "./muscle";
import { BadgeData } from "@typings/utils";

export type Exercise = ExerciseModel;

export type ExerciseWithDifficulty = Exercise & {
  difficulty: Difficulty;
};

export type ExerciseWithMuscles = Exercise & {
  muscles: Muscle[];
};

export type ExerciseRow = Exercise & {
  description?: string;
  difficulty: BadgeData;
  muscles: BadgeData[];
};

export type ExerciseDetails = Exercise & {
  difficulty: BadgeData;
  muscles: BadgeData[];
};
