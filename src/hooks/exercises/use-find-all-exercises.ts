import { trpc } from "@server/client";

type UseFindAllExercisesProps = {
  userId: string;
};

export const useFindAllExercises = ({ userId }: UseFindAllExercisesProps) => {
  const { data, isSuccess, isLoading, isError } = trpc.exercises.findAllExercises.useQuery({ userId });

  return {
    exercises: data ?? [],
    isExercisesSuccess: isSuccess,
    isExercisesLoading: isLoading,
    isExercisesError: isError,
  };
};
