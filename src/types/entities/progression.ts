import { Progression as ProgressionModel } from "@prisma/client";
import { ActivityWithExercise } from "./activity";

export type Progression = ProgressionModel;

export type ProgressionDetails = Progression & {
  activities: ActivityWithExercise[];
};
