import { trpc } from "@server/client";
import { useEffect } from "react";

export const useCreateProgression = () => {
  const utils = trpc.useUtils();

  const { mutate, isSuccess, isError, error, isLoading } =
    trpc.progressions.createProgression.useMutation();

  console.log({ error });

  useEffect(() => {
    if (isSuccess) {
      utils.progressions.findCurrentProgression.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    mutate,
    isSuccess,
    isError,
    isLoading,
  };
};
