"use client";

import { User } from "@typings/next-auth";
import WorkoutTable from "./workout-table/workout-table";
import { workoutColumns } from "./workout-table/workout-columns";
import { useWorkoutTable } from "./workout-table/use-workout-table";

type _Props = {
  user: User;
};

export default function Workouts({ user }: _Props) {
  const { workoutRows } = useWorkoutTable({ userId: user.id });

  return (
    <>
      <WorkoutTable data={workoutRows} columns={workoutColumns} />
    </>
  );
}
