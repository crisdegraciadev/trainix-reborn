"use client";

import { Badge } from "@components/ui/badge";
import { CustomCellProps } from "@typings/table";
import { ExerciseTableData, MuscleTableData } from "./exercise-columns";

export default function MusclesCell({ row }: CustomCellProps<ExerciseTableData>) {
  const muscles: MuscleTableData[] = row.getValue("muscles");

  return (
    <div className="flex flex-wrap gap-1">
      {muscles.length > 5
        ? muscles.slice(0, 5).map(({ name }, idx) => (
            <Badge key={idx} variant="outline">
              {name}
            </Badge>
          ))
        : muscles.map(({ name }, idx) => (
            <Badge key={idx} variant="outline">
              {name}
            </Badge>
          ))}
    </div>
  );
}
