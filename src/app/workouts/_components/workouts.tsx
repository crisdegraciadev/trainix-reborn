"use client";

import { User } from "@typings/next-auth";
import WorkoutTable from "./workout-table/workout-table";
import { workoutColumns } from "./workout-table/workout-columns";
import { LoaderCircle } from "lucide-react";
import { useFindWorkoutRows } from "@hooks/workouts/use-find-workout-rows";

type _Props = {
  user: User;
};

export default function Workouts({ user }: _Props) {
  const { data, isLoading, isRefetching } = useFindWorkoutRows({ userId: user.id });

  if (isLoading || isRefetching || !data) {
    return (
      <div className="w-full pt-64 flex flex-col items-center">
        <LoaderCircle className="animate-spin w-20 h-20" />
        <p className="leading-7 [&:not(:first-child)]:mt-6">Loading workouts...</p>
      </div>
    );
  }

  return (
    <>
      <WorkoutTable data={data} columns={workoutColumns} />
    </>
  );
}
