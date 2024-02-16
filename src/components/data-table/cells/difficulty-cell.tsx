import { Badge } from "@components/ui/badge";
import { DifficultyDataTable } from "@typings/table";
import { ExerciseTableData } from "app/exercises/_components/exercise-table/exercise-columns";
import { CustomCellProps } from "../types";

export function DifficultyCell({ row }: CustomCellProps<ExerciseTableData>) {
  const { name }: DifficultyDataTable = row.getValue("difficulty");

  return (
    <div className="w-[60px]">
      <Badge>{name}</Badge>
    </div>
  );
}
