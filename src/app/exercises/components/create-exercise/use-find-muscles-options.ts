import { SelectOption } from "@components/ui/multi-select";
import { trpc } from "@procedures/client";
import { useEffect, useState } from "react";

export const useFindMusclesOptions = () => {
  const { data, isSuccess, isError } = trpc.muscles.findAllMuscles.useQuery();

  const [muscles, setMuscles] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setMuscles(data.map(({ id, name: label, value }) => ({ id, label, value })));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      setMuscles([]);
    }
  }, [isError]);

  return { muscles };
};
