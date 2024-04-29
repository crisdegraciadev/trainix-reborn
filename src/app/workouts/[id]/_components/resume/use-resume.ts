import { useFindLastProgression } from "@hooks/progression/use-find-last-progression";
import { ProgressionDetails } from "@typings/entities/progression";
import { WorkoutWithRelations } from "@typings/entities/workout";
import { useEffect, useState } from "react";

type _ = {
  workout: WorkoutWithRelations;
};

export const useWorkoutResume = ({ workout }: _) => {
  const { data, isSuccess, isError } = useFindLastProgression({
    workoutId: workout.id,
    isCompleted: true,
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
