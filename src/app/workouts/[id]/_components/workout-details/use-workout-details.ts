import { useFindWorkoutProgression } from "@hooks/workout-progression/use-find-workout-progression";
import { WorkoutDetails, WorkoutProgressionDetails } from "@typings/entities/workout";
import { useEffect, useState } from "react";

type _ = {
  workout: WorkoutDetails;
};

export const useWorkoutDetails = ({ workout }: _) => {
  const { workoutProgression, isWorkoutProgressionSuccess, isWorkoutProgressionError } =
    useFindWorkoutProgression({
      id: workout.progressions[0].id,
    });

  const [currentProgression, setCurrentProgression] = useState<WorkoutProgressionDetails | null>(
    null
  );

  useEffect(() => {
    if (isWorkoutProgressionSuccess && workoutProgression) {
      setCurrentProgression(workoutProgression);
    }
  }, [isWorkoutProgressionSuccess, workoutProgression]);

  useEffect(() => {
    if (isWorkoutProgressionError) {
      setCurrentProgression(null);
    }
  }, [isWorkoutProgressionError]);

  return { currentProgression, isWorkoutProgressionError };
};
