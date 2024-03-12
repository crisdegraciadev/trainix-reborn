import { trpc } from "@server/client";

type _ = Partial<{
  id: string;
  date: Date;
}>;

export const useFindProgression = ({ id, date }: _) => {
  const { data, isSuccess, isLoading, isError } = trpc.progressions.findProgression.useQuery({
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
