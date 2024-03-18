import { trpc } from "@server/client";

type _ = { workoutId: string } & Partial<{
  id: string;
  date: Date;
}>;

export const useFindProgression = ({ workoutId, id, date }: _) => {
  const { data, isSuccess, isLoading, isError } = trpc.progressions.findProgression.useQuery({
    workoutId,
    id,
    date,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
