import { useFindExerciseRows } from "app/exercises/_hooks/use-find-exercise-rows";

type _ = {
  userId: string;
};

export const useExerciseTable = ({ userId }: _) => {
  const { data: exerciseRows } = useFindExerciseRows({ userId });

  return { exerciseRows };
};
