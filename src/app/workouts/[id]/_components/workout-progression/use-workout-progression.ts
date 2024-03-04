import { useFindCurrentProgression } from "@hooks/progression/use-find-current-progression";
import { ProgressionDetails } from "@typings/entities/progression";
import { Workout, WorkoutDetails } from "@typings/entities/workout";
import { useEffect, useState } from "react";

type _ = {
  workout: WorkoutDetails;
};

export const useWorkoutProgression = ({ workout }: _) => {
  const { data, isSuccess, isError } = useFindCurrentProgression({
    id: workout.progressions[0].id,
  });

  const [currentProgression, setCurrentProgression] = useState<ProgressionDetails | null>(null);

  useEffect(() => {
    if (isSuccess && data) {
      setCurrentProgression(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      setCurrentProgression(null);
    }
  }, [isError]);

  return { currentProgression };
};
