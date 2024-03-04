import { trpc } from "@server/client";

type _ = {
  id: string;
};

export const useFindCurrentProgression = ({ id }: _) => {
  const { data, isSuccess, isLoading, isError } = trpc.progressions.findCurrentProgression.useQuery(
    { id }
  );

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
