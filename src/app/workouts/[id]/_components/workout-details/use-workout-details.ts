import { useFindWorkoutProgression } from "@hooks/workout-progression/use-find-workout-progression";
import { WorkoutDetails, WorkoutProgressionDetails } from "@typings/entities/workout";
import { useEffect, useMemo, useState } from "react";

type _ = {
  workout: WorkoutDetails;
};

export const useWorkoutDetails = ({ workout }: _) => {
  const lasProgressionId = useMemo(() => workout.progressions[0].id, [workout]);

  const { workoutProgression, isWorkoutProgressionSuccess, isWorkoutProgressionError } =
    useFindWorkoutProgression({ id: lasProgressionId });

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
