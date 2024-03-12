import { trpc } from "@server/client";
import { useEffect } from "react";

export const useCreateProgression = () => {
  const utils = trpc.useUtils();

  const { mutate, isSuccess, isError, error, isLoading } =
    trpc.progressions.createProgression.useMutation();

  useEffect(() => {
    if (isSuccess) {
      utils.progressions.findProgression.invalidate();
      utils.progressions.findProgressionDates.invalidate();
    }
  }, [isSuccess, utils]);

  return {
    mutate,
    isSuccess,
    isError,
    isLoading,
  };
};
