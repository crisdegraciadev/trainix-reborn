import { useFindProgressionDates } from "@hooks/progression/use-find-progression-dates";
import { ProgressionDetails } from "@typings/entities/progression";
import { WorkoutDetails } from "@typings/entities/workout";
import { useEffect, useMemo, useState } from "react";
import { useWorkoutProgressionContext } from "./workout-progression-context";
import { useFindProgression } from "@hooks/progression/use-find-progression";

type _ = {
  workout: WorkoutDetails;
};

export const useWorkoutProgression = ({ workout }: _) => {
  const {
    setCurrentWorkout,
    setCurrentProgression,
    currentProgression,
    progressionTimeData,
    setProgressionTimeData,
  } = useWorkoutProgressionContext();

  const {
    data: progression,
    isSuccess: isSuccessProgression,
    isError: isErrorProgression,
  } = useFindProgression({
    workoutId: workout.id,
    date: progressionTimeData.selectedDate,
  });

  const {
    data: dates,
    isSuccess: isSuccessDates,
    isError: isErrorDates,
  } = useFindProgressionDates({ workoutId: workout.id });

  const [progressionDates, setProgressionDates] = useState<Date[]>([]);

  const currentProgressionDate = useMemo(
    () => (currentProgression ? new Date(currentProgression?.createdAt) : undefined),
    [currentProgression]
  );

  useEffect(() => {
    setCurrentWorkout(workout);
  }, [setCurrentWorkout, workout]);

  useEffect(() => {
    setProgressionTimeData({
      selectedDate: currentProgressionDate,
      matchDates: progressionDates,
    });
  }, [currentProgressionDate, progressionDates, setProgressionTimeData]);

  useEffect(() => {
    if (isSuccessProgression && progression) {
      setCurrentProgression(progression);
    }
  }, [isSuccessProgression, setCurrentProgression, progression]);

  useEffect(() => {
    if (isErrorProgression) {
      setCurrentProgression(undefined);
    }
  }, [isErrorProgression, setCurrentProgression]);

  useEffect(() => {
    if (isSuccessDates && dates) {
      setProgressionDates(dates);
    }
  }, [isSuccessDates, dates]);

  useEffect(() => {
    if (isErrorDates) {
      setProgressionDates([]);
    }
  }, [isErrorDates]);

  return { currentProgression };
};
