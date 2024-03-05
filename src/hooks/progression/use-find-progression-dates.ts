import { trpc } from "@server/client";

type _ = {
  workoutId: string;
};

export const useFindProgressionDates = ({ workoutId }: _) => {
  const { data, isSuccess, isLoading, isError } = trpc.progressions.findProgressionDates.useQuery({
    workoutId,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
