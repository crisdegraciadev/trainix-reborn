import { Acticity as ActivityModel } from "@prisma/client";
import { Exercise, ExerciseDetails } from "./exercise";
import { Improve } from "./improve";

export type Activity = ActivityModel;

export type ActivityDetails = Activity & {
  exercise: Exercise;
  improve: Improve;
};

export type ActivityMerge = Activity & ExerciseDetails & { total: number; description: string };
