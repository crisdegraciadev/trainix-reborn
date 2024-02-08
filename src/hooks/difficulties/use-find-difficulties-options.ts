import { trpc } from "@server/client";

export const useFindDifficultiesOptions = () => {
  const { data, isSuccess, isError } = trpc.difficulties.findAllDifficulties.useQuery();

  return {
    difficulties: data ?? [],
    isDifficultiesSuccess: isSuccess,
    isDifficultiesError: isError,
  };
};
