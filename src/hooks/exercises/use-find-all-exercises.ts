import { trpc } from "@server/client";

type Props = {
  userId: string;
};

export const useFindAllExercises = ({ userId }: Props) => {
  const { data, isSuccess, isLoading, isError } = trpc.exercises.findAllExercises.useQuery({ userId });

  return {
    exercises: data ?? [],
    isExercisesSuccess: isSuccess,
    isExercisesLoading: isLoading,
    isExercisesError: isError,
  };
};
