import { Badge } from "@components/ui/badge";
import { DifficultyDataTable } from "@typings/table";
import { CustomCellProps } from "../types";

export function DifficultyCell<T>({ row }: CustomCellProps<T>) {
  const { name }: DifficultyDataTable = row.getValue("difficulty");

  return (
    <div className="w-[60px]">
      <Badge>{name}</Badge>
    </div>
  );
}
