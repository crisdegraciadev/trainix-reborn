import { trpc } from "@server/client";
import { useEffect } from "react";

export const useCreateWorkout = () => {
  const utils = trpc.useUtils();

  const { mutate, isSuccess, isError, isLoading } = trpc.workouts.createWorkout.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.workouts.findWorkoutRows.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    mutate,
    isSuccess,
    isError,
    isLoading,
  };
};
