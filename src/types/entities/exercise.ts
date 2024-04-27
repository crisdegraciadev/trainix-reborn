import { Exercise as ExerciseModel } from "@prisma/client";
import { Difficulty } from "./difficulty";
import { Muscle } from "./muscle";
import { NameValue } from "@typings/utils";

export type Exercise = ExerciseModel;

export type ExerciseWithDifficulty = Exercise & {
  difficulty: Difficulty;
};

export type ExerciseWithMuscles = Exercise & {
  muscles: Muscle[];
};

export type ExerciseRow = Exercise & {
  description?: string | null;
  difficulty: NameValue;
  muscles: NameValue[];
};

export type ExerciseDetails = Exercise & {
  difficulty: NameValue;
  muscles: NameValue[];
};
