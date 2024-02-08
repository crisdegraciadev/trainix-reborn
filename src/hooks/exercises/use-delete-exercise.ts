import { trpc } from "@server/client";
import { useEffect } from "react";

export const useDeleteExercise = () => {
  const utils = trpc.useUtils();

  const { mutate, isLoading, isSuccess, isError } = trpc.exercises.deleteExercise.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.exercises.findAllExercises.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    deleteExercise: mutate,
    isDeleteExerciseSuccess: isSuccess,
    isDeleteExerciseLoading: isLoading,
    isDeleteExerciseError: isError,
  };
};
