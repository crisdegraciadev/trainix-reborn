import { useEffect, useState } from "react";
import { useFindExerciseRows } from "app/exercises/_hooks/use-find-exercise-rows";
import { ExerciseRow } from "@typings/entities/exercise";

type _ = {
  userId: string;
};

export const useExerciseTable = ({ userId }: _) => {
  const { data, isSuccess, isError } = useFindExerciseRows({ userId });

  const [exerciseRows, setExerciseRows] = useState<ExerciseRow[]>([]);

  useEffect(() => {
    if (isSuccess && data) {
      setExerciseRows(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      setExerciseRows([]);
    }
  }, [isError]);

  return { exerciseRows };
};
