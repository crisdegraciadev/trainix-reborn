import { useFindAllWorkouts } from "@hooks/workouts/use-find-all-workouts";
import { useCallback, useEffect, useState } from "react";
import { WorkoutTableData } from "./workout-columns";
import { WorkoutModel } from "@typings/entities";

type _Props = {
  userId: string;
};

export const useWorkoutTable = ({ userId }: _Props) => {
  const { workouts, isWorkoutsSuccess, isWorkoutsError } = useFindAllWorkouts({ userId });

  const [workoutRows, setWorkoutRows] = useState<WorkoutTableData[]>([]);

  const buildRows = useCallback((data: WorkoutModel[]) => {
    return data.map((workout) => {
      const { id, name, description: rawDescription, difficulty: rawDifficulty, muscles: rawMuscles } = workout;

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
    if (isWorkoutsSuccess) {
      setWorkoutRows(buildRows(workouts));
    }
  }, [isWorkoutsSuccess, workouts, buildRows]);

  useEffect(() => {
    if (isWorkoutsError) {
      setWorkoutRows([]);
    }
  }, [isWorkoutsError]);

  return { workoutRows };
};
