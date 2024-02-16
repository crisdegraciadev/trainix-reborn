import { trpc } from "@server/client";
import { useEffect } from "react";

export const useDeleteWorkout = () => {
  const utils = trpc.useUtils();

  const { mutate, isLoading, isSuccess, isError } = trpc.workouts.deleteWorkout.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.workouts.findAllWorkouts.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    deleteWorkout: mutate,
    isDeleteWorkoutSuccess: isSuccess,
    isDeleteWorkoutLoading: isLoading,
    isDeleteWorkoutError: isError,
  };
};
