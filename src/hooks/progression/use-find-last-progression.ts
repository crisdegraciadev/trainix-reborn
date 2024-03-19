import { trpc } from "@server/client";

type _ = { workoutId: string } & Partial<{
  id: string;
  isCompleted?: boolean;
}>;

export const useFindLastProgression = ({ workoutId, isCompleted }: _) => {
  const { data, isSuccess, isLoading, isError } = trpc.progressions.findLastProgression.useQuery({
    workoutId,
    isCompleted,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
