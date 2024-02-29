import { trpc } from "@server/client";

export const useFindDifficulties = () => {
  const { data, isSuccess, isError } = trpc.difficulties.findDifficultySelectList.useQuery();

  return {
    data,
    isSuccess,
    isError,
  };
};
