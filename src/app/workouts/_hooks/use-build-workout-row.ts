import { Workout } from "@typings/entities";
import { useState } from "react";
import { WorkoutTableData } from "../_components/workout-table/workout-columns";

export const useBuildWorkoutRow = () => {
  const [workoutRows, setWorkoutRows] = useState<WorkoutTableData[]>([]);

  const buildRows = (data: Workout[]) => {
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
  };
};
