import { trpc } from "@server/client";
import { useEffect } from "react";

export const useUpdateExercise = () => {
  const utils = trpc.useUtils();

  const { mutate, isLoading, isSuccess, isError } = trpc.exercises.updateExercise.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.exercises.findExerciseRows.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    mutate,
    isSuccess,
    isLoading,
    isError,
  };
};
