import { trpc } from "@server/client";

type _Props = {
  id: string;
};

export const useFindExercise = ({ id }: _Props) => {
  const { data, isSuccess, isLoading, isError } = trpc.exercises.findExercise.useQuery({ id });

  return {
    exercise: data ?? [],
    isExerciseSuccess: isSuccess,
    isExerciseLoading: isLoading,
    isExerciseError: isError,
  };
};
