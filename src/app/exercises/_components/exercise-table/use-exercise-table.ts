import { trpc } from "@procedures/client";
import { useEffect, useState } from "react";
import { ExerciseTableData } from "./exercise-columns";

type UseExerciseTable = {
  userId: string;
};

export const useExerciseTable = ({ userId }: UseExerciseTable) => {
  const { data: rawData, isSuccess, isError } = trpc.exercises.findAllExercises.useQuery({ userId });
  const [data, setData] = useState<ExerciseTableData[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setData(
        rawData.map(({ id, name, description, difficulty, muscles: rawMuscles }) => {
          return {
            id,
            name,
            description,
            difficulty: difficulty?.name,
            muscles: rawMuscles.map(({ name }) => ({ name })),
          };
        })
      );
    }
  }, [isSuccess, rawData]);

  useEffect(() => {
    if (isError) {
      setData([]);
    }
  }, [isError]);

  return { data };
};
