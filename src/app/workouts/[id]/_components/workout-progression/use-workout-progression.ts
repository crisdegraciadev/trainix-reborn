import { useFindCurrentProgression } from "@hooks/progression/use-find-current-progression";
import { useFindProgressionDates } from "@hooks/progression/use-find-progression-dates";
import { ProgressionDetails } from "@typings/entities/progression";
import { WorkoutDetails } from "@typings/entities/workout";
import { useEffect, useMemo, useState } from "react";

type _ = {
  workout: WorkoutDetails;
};

export const useWorkoutProgression = ({ workout }: _) => {
  const {
    data: progression,
    isSuccess: isSuccessProgression,
    isError: isErrorProgression,
  } = useFindCurrentProgression({
    id: workout.progressions[0].id,
  });

  const {
    data: dates,
    isSuccess: isSuccessDates,
    isError: isErrorDates,
  } = useFindProgressionDates({ workoutId: workout.id });

  const [currentProgression, setCurrentProgression] = useState<ProgressionDetails | null>(null);
  const [progressionDates, setProgressionDates] = useState<Date[]>([]);

  const currentProgressionDate = useMemo(
    () => currentProgression && new Date(currentProgression?.createdAt),
    [currentProgression]
  );

  useEffect(() => {
    if (isSuccessProgression && progression) {
      setCurrentProgression(progression);
    }
  }, [isSuccessProgression, progression]);

  useEffect(() => {
    if (isErrorProgression) {
      setCurrentProgression(null);
    }
  }, [isErrorProgression]);

  useEffect(() => {
    if (isSuccessDates && dates) {
      setProgressionDates(dates.map((date) => new Date(date)));
    }
  }, [isSuccessDates, dates]);

  useEffect(() => {
    if (isErrorDates) {
      setProgressionDates([]);
    }
  }, [isErrorDates]);

  return { currentProgression, currentProgressionDate, progressionDates };
};
