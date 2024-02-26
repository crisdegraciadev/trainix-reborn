import { trpc } from "@server/client";

export const useFindMuscles = () => {
  const { data, isSuccess, isLoading, isError } = trpc.muscles.findAllMuscles.useQuery();

  return {
    muscles: data ?? [],
    isMusclesSuccess: isSuccess,
    isMusclesLoading: isLoading,
    isMusclesError: isError,
  };
};
