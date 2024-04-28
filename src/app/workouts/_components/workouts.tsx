"use client";

import { User } from "@typings/next-auth";
import { useFindWorkoutRows } from "@hooks/workouts/use-find-workout-rows";
import TableSkeleton from "@components/loaders/table-skeleton";
import WorkoutTable from "./table/table";
import { workoutColumns } from "./table/columns";

type _Props = {
  user: User;
};

export default function Workouts({ user }: _Props) {
  const { data, isLoading, isRefetching } = useFindWorkoutRows({ userId: user.id });

  if (isLoading || isRefetching || !data) {
    return <TableSkeleton />;
  }

  return <WorkoutTable data={data} columns={workoutColumns} />;
}
