import { useCallback, useEffect, useState } from "react";
import { ExerciseTableData } from "./exercise-columns";
import { useFindAllExercises } from "@hooks/exercises/use-find-all-exercises";

type _Props = {
  userId: string;
};

export const useExerciseTable = ({ userId }: _Props) => {
  const { exercises, isExercisesSuccess, isExercisesError } = useFindAllExercises({ userId });

  const [exerciseRows, setExerciseRows] = useState<ExerciseTableData[]>([]);

  const buildRows = useCallback((data: typeof exercises) => {
    return data.map((exercise) => {
      const { id, name, description: rawDescription, difficulty: rawDifficulty, muscles: rawMuscles } = exercise;

      const description = rawDescription === null ? undefined : rawDescription;

      const difficulty = {
        id: rawDifficulty.id,
        name: rawDifficulty.name,
        value: rawDifficulty.value,
      };

      const muscles = rawMuscles.map(({ id, name, value }) => ({ id, name, value }));

      return { id, name, description, difficulty, muscles };
    });
  }, []);

  useEffect(() => {
    if (isExercisesSuccess) {
      setExerciseRows(buildRows(exercises));
    }
  }, [isExercisesSuccess, exercises, buildRows]);

  useEffect(() => {
    if (isExercisesError) {
      setExerciseRows([]);
    }
  }, [isExercisesError]);

  return { exerciseRows };
};
