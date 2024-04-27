"use client";

import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";
import NameCell from "@components/data-table/cells/name-cell";
import { DataTableColumnHeader } from "@components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { ExerciseRow } from "@typings/entities/exercise";
import ExerciseActionsCell from "./actions/actions-cell";
import { ExerciseActionsContextProvider } from "./actions/actions-context";

export const exerciseColumns: ColumnDef<ExerciseRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <NameCell row={row} split={30} />,
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
      return (
        <ExerciseActionsContextProvider>
          <ExerciseActionsCell row={row} />
        </ExerciseActionsContextProvider>
      );
    },
  },
];
