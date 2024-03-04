import { Progression as ProgressionModel } from "@prisma/client";
import { ActivityDetails, ActivityMerge } from "./activity";

export type Progression = Omit<ProgressionModel, "createdAt">;

export type ProgressionPreview = Progression & {
  activities: ActivityDetails[];
};

export type ProgressionDetails = Omit<Progression, "createdAt"> & {
  activities: ActivityMerge[];
};
