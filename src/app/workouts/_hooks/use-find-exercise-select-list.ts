import { trpc } from "@server/client";

type _ = {
  userId: string;
};
export const useFindExerciseSelectList = ({ userId }: _) => {
  const { data, isSuccess, isLoading, isError } = trpc.exercises.findExerciseSelectList.useQuery({ userId });

  return { data, isSuccess, isLoading, isError };
};
