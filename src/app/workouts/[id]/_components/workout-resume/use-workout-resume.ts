import { useFindProgression } from "@hooks/progression/use-find-progression";
import { ProgressionDetails } from "@typings/entities/progression";
import { WorkoutDetails } from "@typings/entities/workout";
import { useEffect, useMemo, useState } from "react";

type _ = {
  workout: WorkoutDetails;
};

export const useWorkoutResume = ({ workout }: _) => {
  const lasProgressionId = useMemo(() => workout.progressions[0].id, [workout]);

  const { data, isSuccess, isError } = useFindProgression({ id: lasProgressionId });

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
