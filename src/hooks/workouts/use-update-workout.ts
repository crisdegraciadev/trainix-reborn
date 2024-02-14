import { trpc } from "@server/client";
import { useEffect } from "react";

export const useUpdateWorkout = () => {
  const utils = trpc.useUtils();

  const { mutate, isLoading, isSuccess, isError } = trpc.workouts.updateWorkout.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.workouts.findAllWorkouts.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    updateWorkout: mutate,
    isUpdateWorkoutSuccess: isSuccess,
    isUpdateWorkoutLoading: isLoading,
    isUpdateWorkoutError: isError,
  };
};
