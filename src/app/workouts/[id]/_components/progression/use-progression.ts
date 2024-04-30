import { useFindProgressionDates } from "@hooks/progression/use-find-progression-dates";
import { WorkoutWithRelations } from "@typings/entities/workout";
import { useEffect } from "react";
import { useFindProgression } from "@hooks/progression/use-find-progression";
import { useWorkoutProgressionContext } from "./progression-context";

type _ = {
  workout: WorkoutWithRelations;
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
    isLoading: isLoadingProgression,
    isSuccess: isProgressionSuccess,
  } = useFindProgression({
    workoutId: workout.id,
    date: progressionTimeData.selectedDate,
  });

  const { data: dates, isSuccess: isSuccessDates } = useFindProgressionDates({
    workoutId: workout.id,
  });

  useEffect(() => {
    setCurrentWorkout(workout);
  }, [setCurrentWorkout, workout]);

  useEffect(() => {
    if (progression && isProgressionSuccess) {
      setCurrentProgression(progression);
    }
  }, [setCurrentProgression, isProgressionSuccess, progression]);

  useEffect(() => {
    if (dates && isSuccessDates) {
      setProgressionTimeData((state) => ({ ...state, matchDates: dates }));
    }
  }, [currentProgression, isSuccessDates, setProgressionTimeData, dates]);

  useEffect(() => {
    if (dates) {
      setProgressionTimeData((state) => ({ ...state, selectedDate: dates[dates?.length - 1] }));
    }
  }, [dates, setProgressionTimeData]);

  return { progression, isLoadingProgression };
};
