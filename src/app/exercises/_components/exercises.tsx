"use client";

import { User } from "@typings/next-auth";
import { exerciseColumns } from "./exercise-table/exercise-columns";
import ExerciseTable from "./exercise-table/exercise-table";
import { LoaderCircle } from "lucide-react";
import { useFindExerciseRows } from "../_hooks/use-find-exercise-rows";
import TableSkeleton from "@components/loaders/table-skeleton";

type _ = {
  user: User;
};

export default function Exercises({ user }: _) {
  const { data, isLoading, isRefetching } = useFindExerciseRows({ userId: user.id });

  if (isLoading || isRefetching || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <ExerciseTable data={data} columns={exerciseColumns} />
    </>
  );
}
