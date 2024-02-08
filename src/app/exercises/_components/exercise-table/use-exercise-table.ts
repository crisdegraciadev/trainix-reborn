import { useEffect, useState } from "react";
import { ExerciseTableData } from "./exercise-columns";
import { useFindAllExercises } from "@hooks/exercises/use-find-all-exercises";

type UseExerciseTable = {
  userId: string;
};

export const useExerciseTable = ({ userId }: UseExerciseTable) => {
  const { exercises, isExercisesSuccess, isExercisesError } = useFindAllExercises({ userId });

  const [exercisesRows, setExercisesRows] = useState<ExerciseTableData[]>([]);

  useEffect(() => {
    if (isExercisesSuccess) {
      setExercisesRows(
        exercises.map(({ id, name, difficulty, muscles: rawMuscles }) => {
          return {
            id,
            name,
            difficulty: {
              id: difficulty.id,
              name: difficulty.name,
              value: difficulty.value,
            },
            muscles: rawMuscles.map(({ id, name, value }) => ({ id, name, value })),
          };
        })
      );
    }
  }, [isExercisesSuccess, exercises]);

  useEffect(() => {
    if (isExercisesError) {
      setExercisesRows([]);
    }
  }, [isExercisesError]);

  return { exercisesRows };
};
