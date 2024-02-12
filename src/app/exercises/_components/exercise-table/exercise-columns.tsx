"use client";

import { ColumnDef } from "@tanstack/react-table";
import ExerciseActionsCell from "./exercise-actions-cell";
import { CustomCellProps } from "@typings/table";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "@components/data-table/data-table-column-header";

export type MuscleTableData = {
  id: string;
  name: string;
  value: string;
};

export type DifficultyDataTable = {
  id: string;
  name: string;
  value: string;
};

export type ExerciseTableData = {
  id: string;
  name: string;
  difficulty: DifficultyDataTable;
  muscles: MuscleTableData[];
};

export const exerciseColumns: ColumnDef<ExerciseTableData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">
          <span className="w-[50px] truncate font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue: string = row.getValue(id);
      return rowValue.includes(value);
    },
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
  const { name }: DifficultyDataTable = row.getValue("difficulty");

  return (
    <div className="w-[60px]">
      <Badge>{name}</Badge>
    </div>
  );
}

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
