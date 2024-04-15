"use client";

import { User } from "@typings/next-auth";
import WorkoutTable from "./workout-table/workout-table";
import { workoutColumns } from "./workout-table/workout-columns";
import { useFindWorkoutRows } from "@hooks/workouts/use-find-workout-rows";
import { Skeleton } from "@components/ui/skeleton";

type _Props = {
  user: User;
};

export default function Workouts({ user }: _Props) {
  const { data, isLoading, isRefetching } = useFindWorkoutRows({ userId: user.id });

  if (isLoading || isRefetching || !data) {
    return <Skeleton className="w-[100px] h-[20px] rounded" />;
  }

  return <WorkoutTable data={data} columns={workoutColumns} />;
}
