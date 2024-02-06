import { useEffect, useState } from "react";
import { trpc } from "../../../trpc/client";
import { MultiSelectOption } from "../../../components/ui/multi-select";

export const useFindMusclesOptions = () => {
  const { data, isSuccess, isError } = trpc.findAllMuscles.useQuery();

  const [muscles, setMuscles] = useState<MultiSelectOption[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setMuscles(
        data.map(({ id, name: label, value }) => ({ id, label, value }))
      );
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      setMuscles([]);
    }
  }, [isError]);

  return { muscles };
};
