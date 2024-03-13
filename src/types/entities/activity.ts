import { Acticity as ActivityModel } from "@prisma/client";
import { ExerciseDetails } from "./exercise";
import { Improve } from "./improve";

export type Activity = ActivityModel;

export type ActivityWithExercise = Activity &
  ExerciseDetails & { total: number; description: string; improve: Improve | null };
