import { trpc } from "@server/client";

export const useFindMusclesOptions = () => {
  const { data, isSuccess, isLoading, isError } = trpc.muscles.findMusclesSelectList.useQuery();

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
