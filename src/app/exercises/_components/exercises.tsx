"use client";

import { User } from "next-auth";
import { exerciseColumns } from "./exercise-table/exercise-columns";
import ExerciseTable from "./exercise-table/exercise-table";
import { useExerciseTable } from "./exercise-table/use-exercise-table";
import ExerciseToolbar from "./exercise-toolbar";

type ExercisesProps = {
  user: User;
};

export default function Exercises({ user }: ExercisesProps) {
  const { exercisesRows } = useExerciseTable({ userId: user.id });

  return (
    <>
      <ExerciseToolbar />
      <ExerciseTable data={exercisesRows} columns={exerciseColumns} />
    </>
  );
}
