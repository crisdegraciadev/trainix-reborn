import { useEffect, useState } from "react";
import { trpc } from "../../../trpc/client";
import { SelectOption } from "../../../components/ui/multi-select";

export const useFindDifficultiesOptions = () => {
  const { data, isSuccess, isError } = trpc.findAllDifficulties.useQuery();

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
