"use client";

import { User } from "@typings/next-auth";
import { exerciseColumns } from "./exercise-table/exercise-columns";
import ExerciseTable from "./exercise-table/exercise-table";
import { useExerciseTable } from "./exercise-table/use-exercise-table";
import { LoaderCircle } from "lucide-react";

type _ = {
  user: User;
};

export default function Exercises({ user }: _) {
  const { exerciseRows } = useExerciseTable({ userId: user.id });

  if (!exerciseRows) {
    return (
      <div className="w-full pt-64 flex flex-col items-center">
        <LoaderCircle className="animate-spin w-20 h-20" />
        <p className="leading-7 [&:not(:first-child)]:mt-6">Loading exercises...</p>
      </div>
    );
  }

  return (
    <>
      <ExerciseTable data={exerciseRows} columns={exerciseColumns} />
    </>
  );
}
