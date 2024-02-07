import { Badge } from "@components/ui/badge";
import { CustomCellProps } from "@typings/table";
import { ExerciseTableData } from "./exercise-columns";

export default function DifficultyCell({ row }: CustomCellProps<ExerciseTableData>) {
  const difficulty: string[] = row.getValue("difficulty");

  return <Badge>{difficulty}</Badge>;
}
