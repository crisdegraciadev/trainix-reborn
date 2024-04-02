"use client";

import { User } from "@typings/next-auth";
import { exerciseColumns } from "./exercise-table/exercise-columns";
import ExerciseTable from "./exercise-table/exercise-table";
import { LoaderCircle } from "lucide-react";
import { useFindExerciseRows } from "../_hooks/use-find-exercise-rows";

type _ = {
  user: User;
};

export default function Exercises({ user }: _) {
  const { data, isLoading } = useFindExerciseRows({ userId: user.id });

  if (isLoading || !data) {
    return (
      <div className="w-full pt-64 flex flex-col items-center">
        <LoaderCircle className="animate-spin w-20 h-20" />
        <p className="leading-7 [&:not(:first-child)]:mt-6">Loading exercises...</p>
      </div>
    );
  }

  return (
    <>
      <ExerciseTable data={data} columns={exerciseColumns} />
    </>
  );
}
