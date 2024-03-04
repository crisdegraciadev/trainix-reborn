import { Acticity as ActivityModel } from "@prisma/client";
import { Exercise, ExerciseDetails } from "./exercise";

export type Activity = ActivityModel;

export type ActivityDetails = Activity & {
  exercise: Exercise;
};

export type ActivityMerge = Activity & ExerciseDetails & { total: number; description: string };
