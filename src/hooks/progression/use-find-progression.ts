import { trpc } from "@server/client";

type _ = {
  id: string;
};

export const useFindProgression = ({ id }: _) => {
  const { data, isSuccess, isLoading, isError } = trpc.progressions.findProgression.useQuery({
    id,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
