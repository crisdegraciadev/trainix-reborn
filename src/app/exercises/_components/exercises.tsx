"use client";

import TableSkeleton from "@components/loaders/table-skeleton";
import { User } from "@typings/next-auth";
import { useFindExerciseRows } from "../_hooks/use-find-exercise-rows";
import ExerciseTable from "./table/table";
import { exerciseColumns } from "./table/columns";

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
