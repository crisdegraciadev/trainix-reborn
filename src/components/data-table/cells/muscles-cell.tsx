import { MuscleTableData } from "@typings/table";
import { ExerciseTableData } from "app/exercises/_components/exercise-table/exercise-columns";
import { CustomCellProps } from "../types";
import { Badge } from "@components/ui/badge";

export function MusclesCell({ row }: CustomCellProps<ExerciseTableData>) {
  const muscles: MuscleTableData[] = row.getValue("muscles");

  return (
    <div className="w-[500px]">
      <div className="flex flex-wrap gap-1 ">
        {muscles.length > 5 ? (
          <>
            {muscles.slice(0, 5).map(({ name }, idx) => (
              <Badge key={idx} variant="outline">
                {name}
              </Badge>
            ))}
            <Badge variant="secondary">+ {muscles.length - 5} more</Badge>
          </>
        ) : (
          muscles.map(({ name }, idx) => (
            <Badge key={idx} variant="outline">
              {name}
            </Badge>
          ))
        )}
      </div>
    </div>
  );
}
