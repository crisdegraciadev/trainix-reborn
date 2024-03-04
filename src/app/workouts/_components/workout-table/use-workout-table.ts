import { useEffect, useState } from "react";
import { WorkoutRow } from "@typings/entities/workout";
import { useFindWorkoutRows } from "@hooks/workouts/use-find-workout-rows";

type _Props = {
  userId: string;
};

export const useWorkoutTable = ({ userId }: _Props) => {
  const { workouts, isWorkoutsSuccess, isWorkoutsError } = useFindWorkoutRows({ userId });

  const [workoutRows, setWorkoutRows] = useState<WorkoutRow[]>([]);

  useEffect(() => {
    if (isWorkoutsSuccess) {
      setWorkoutRows(workouts);
    }
  }, [isWorkoutsSuccess, workouts]);

  useEffect(() => {
    if (isWorkoutsError) {
      setWorkoutRows([]);
    }
  }, [isWorkoutsError]);

  return { workoutRows };
};
