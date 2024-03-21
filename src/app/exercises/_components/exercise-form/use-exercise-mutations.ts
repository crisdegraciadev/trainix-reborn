import { useCreateExercise } from "@hooks/exercises/use-create-exercise";
import { useUpdateExercise } from "@hooks/exercises/use-update-exercise";

export const useExerciseMutations = () => {
  const {
    isSuccess: isCreateExerciseSuccess,
    isLoading: isCreateExerciseLoading,
    isError: isCreateExerciseError,
    mutate: createExercise,
  } = useCreateExercise();

  const {
    isSuccess: isUpdateExerciseSuccess,
    isLoading: isUpdateExerciseLoading,
    isError: isUpdateExerciseError,
    mutate: updateExercise,
  } = useUpdateExercise();

  return {
    createExercise,
    isCreateExerciseSuccess,
    isCreateExerciseLoading,
    isCreateExerciseError,
    updateExercise,
    isUpdateExerciseSuccess,
    isUpdateExerciseLoading,
    isUpdateExerciseError,
  };
};
