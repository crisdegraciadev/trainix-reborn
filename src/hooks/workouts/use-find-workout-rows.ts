import { trpc } from "@server/client";

type _Props = {
  userId: string;
};

export const useFindWorkoutRows = ({ userId }: _Props) => {
  const { data, isSuccess, isLoading, isError } = trpc.workouts.findWorkoutRows.useQuery({
    userId,
  });

  return {
    workouts: data ?? [],
    isWorkoutsSuccess: isSuccess,
    isWorkoutsLoading: isLoading,
    isWorkoutsError: isError,
  };
};
