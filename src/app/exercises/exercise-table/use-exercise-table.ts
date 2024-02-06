import { useEffect, useState } from "react";
import { trpc } from "../../../trpc/client";
import { ExerciseTableData } from "./exercise-columns";

type UseExerciseTable = {
  userId: string;
};

export const useExerciseTable = ({ userId }: UseExerciseTable) => {
  const {
    data: rawData,
    isSuccess,
    isError,
  } = trpc.findAllExercises.useQuery({ userId });
  const [data, setData] = useState<ExerciseTableData[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setData(
        rawData.map(({ name, description, muscles: rawMuscles }) => {
          return {
            name,
            description,
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
