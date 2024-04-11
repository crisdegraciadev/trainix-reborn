import { trpc } from "@server/client";

type _Props = {
  userId: string;
};

export const useFindWorkoutRows = ({ userId }: _Props) => {
  const { data, isSuccess, isLoading, isRefetching, isError } =
    trpc.workouts.findWorkoutRows.useQuery({
      userId,
    });

  return {
    data,
    isSuccess,
    isLoading,
    isRefetching,
    isError,
  };
};
