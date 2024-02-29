import { useFindWorkoutProgression } from "@hooks/workout-progression/use-find-workout-progression";
import { Workout, WorkoutActicity, WorkoutProgression } from "@prisma/client";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { WorkoutWithDeps, WorktoutProgressionWithDeps } from "@typings/entities";

type _Props = {
  workout: WorkoutWithDeps;
};

export const useWorkoutDetails = ({ workout }: _Props) => {
  const { workoutProgression, isWorkoutProgressionSuccess, isWorkoutProgressionError } = useFindWorkoutProgression({
    id: workout.progressions[0].id,
  });

  const [lastWorkoutProgression, setLastWorkoutProgression] = useState<WorktoutProgressionWithDeps | null>(null);

  useEffect(() => {
    if (isWorkoutProgressionSuccess && workoutProgression) {
      setLastWorkoutProgression(workoutProgression);
    }
  }, [isWorkoutProgressionSuccess, workoutProgression]);

  useEffect(() => {
    if (isWorkoutProgressionError) {
      setLastWorkoutProgression(null);
    }
  }, [isWorkoutProgressionError]);

  return { lastWorkoutProgression, isWorkoutProgressionError };
};
