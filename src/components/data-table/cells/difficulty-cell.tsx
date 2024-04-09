import { Badge } from "@components/ui/badge";
import { CustomCellProps } from "../types";
import { Difficulty } from "@typings/entities/difficulty";

export function DifficultyCell<T>({ row }: CustomCellProps<T>) {
  const { name }: Difficulty = row.getValue("difficulty");

  return (
    <div className="w-[60px]">
      <Badge>{name}</Badge>
    </div>
  );
}
