import { trpc } from "@server/client";
import { useEffect } from "react";

export const useCreateExercise = () => {
  const utils = trpc.useUtils();

  const { mutate, isSuccess, isError, isLoading } = trpc.exercises.createExercise.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.exercises.findExerciseRows.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    mutate,
    isSuccess,
    isError,
    isLoading,
  };
};
