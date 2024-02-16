"use client";

import { ColumnDef } from "@tanstack/react-table";
import ExerciseActionsCell from "./exercise-actions-cell";
import { Badge } from "@components/ui/badge";
import { DataTableColumnHeader } from "@components/data-table/data-table-column-header";
import { CustomCellProps } from "@components/data-table/types";
import { DifficultyDataTable, MuscleTableData } from "@typings/table";
import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";

export type ExerciseTableData = {
  id: string;
  name: string;
  description?: string;
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
