import { trpc } from "@server/client";
import { useEffect } from "react";

export const useUpdateExercise = () => {
  const utils = trpc.useUtils();

  const { mutate, isLoading, isSuccess, isError } = trpc.exercises.updateExercise.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.exercises.findAllExercises.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    updateExercise: mutate,
    isUpdateExerciseSuccess: isSuccess,
    isUpdateExerciseLoading: isLoading,
    isUpdateExerciseError: isError,
  };
};
