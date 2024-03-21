import { useFindDifficulties } from "@hooks/difficulties/use-find-difficulties-options";
import { useFindMusclesSelectList } from "@hooks/muscles/use-find-muscles-options";

export const useExerciseQueries = () => {
  const { data: muscles } = useFindMusclesSelectList();

  const { data: difficulties } = useFindDifficulties();

  return {
    muscles,
    difficulties,
  };
};
