import { trpc } from "@server/client";

type _Props = {
  id: string;
};

export const useFindWorkoutProgression = ({ id }: _Props) => {
  const { data, isSuccess, isLoading, isError } = trpc.workoutProgressions.findWorkoutProgression.useQuery({ id });

  return {
    workoutProgression: data,
    isWorkoutProgressionSuccess: isSuccess,
    isWorkoutProgressionLoading: isLoading,
    isWorkoutProgressionError: isError,
  };
};
