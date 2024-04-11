import { trpc } from "@server/client";

type _ = {
  userId: string;
};

export const useFindExerciseRows = ({ userId }: _) => {
  const { data, isSuccess, isLoading, isRefetching, isError } =
    trpc.exercises.findExerciseRows.useQuery({ userId });

  return { data, isSuccess, isLoading, isRefetching, isError };
};
