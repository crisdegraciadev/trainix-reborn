"use client";

import { User } from "@typings/next-auth";
import { exerciseColumns } from "./exercise-table/exercise-columns";
import ExerciseTable from "./exercise-table/exercise-table";
import { useExerciseTable } from "./exercise-table/use-exercise-table";

type _Props = {
  user: User;
};

export default function Exercises({ user }: _Props) {
  const { exerciseRows } = useExerciseTable({ userId: user.id });

  return (
    <>
      <ExerciseTable data={exerciseRows} columns={exerciseColumns} />
    </>
  );
}
