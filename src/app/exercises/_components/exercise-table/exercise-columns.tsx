"use client";

import { ColumnDef } from "@tanstack/react-table";
import ExerciseActionsCell from "./exercise-actions-cell";
import { CustomCellProps } from "@typings/table";
import { Badge } from "@components/ui/badge";

export type MuscleTableData = {
  name: string;
};

export type ExerciseTableData = {
  id: string;
  name: string;
  description: string | null;
  difficulty: string;
  muscles: MuscleTableData[];
};

export const exerciseColumns: ColumnDef<ExerciseTableData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => <DifficultyCell row={row} />,
  },
  {
    accessorKey: "muscles",
    header: "Muscles",
    cell: ({ row }) => <MusclesCell row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ExerciseActionsCell row={row} />;
    },
  },
];

export function DifficultyCell({ row }: CustomCellProps<ExerciseTableData>) {
  const difficulty: string[] = row.getValue("difficulty");
  return <Badge>{difficulty}</Badge>;
}

export function MusclesCell({ row }: CustomCellProps<ExerciseTableData>) {
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
