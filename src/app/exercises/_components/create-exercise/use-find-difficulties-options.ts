import { SelectOption } from "@components/ui/multi-select";
import { trpc } from "@procedures/client";
import { useEffect, useState } from "react";

export const useFindDifficultiesOptions = () => {
  const { data, isSuccess, isError } = trpc.difficulties.findAllDifficulties.useQuery();

  const [difficulties, setDifficulties] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setDifficulties(data.map(({ id, name: label, value }) => ({ id, label, value })));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      setDifficulties([]);
    }
  }, [isError]);

  return { difficulties };
};
