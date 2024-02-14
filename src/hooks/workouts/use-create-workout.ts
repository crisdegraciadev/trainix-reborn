import { trpc } from "@server/client";
import { useEffect } from "react";

export const useCreateWorkout = () => {
  const utils = trpc.useUtils();

  const { mutate, isSuccess, isError, isLoading } = trpc.workouts.createWorkout.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.workouts.findAllWorkouts.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    createWorkout: mutate,
    isCreateWorkoutSuccess: isSuccess,
    isCreateWorkoutError: isError,
    isCreateWorkoutLoading: isLoading,
  };
};
