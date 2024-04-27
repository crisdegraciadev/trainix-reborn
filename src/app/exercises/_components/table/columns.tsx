"use client";

import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";
import NameCell from "@components/data-table/cells/name-cell";
import { DataTableColumnHeader } from "@components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { ExerciseRow } from "@typings/entities/exercise";
import ExerciseActionsCell from "./actions/actions-cell";
import { ExerciseActionsContextProvider } from "./actions/actions-context";
import { NameValue } from "@typings/utils";

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
    filterFn: (row, id, value) => {
      const { value: rowValue }: NameValue = row.getValue(id);
      return value.some((value: string) => rowValue === value);
    },
  },
  {
    accessorKey: "muscles",
    header: "Muscles",
    cell: ({ row }) => <MusclesCell row={row} />,
    filterFn: (row, id, value) => {
      const rowValues: NameValue[] = row.getValue(id);
      console.log({ id, rowValues });
      const muscleValues = rowValues.map(({ value }) => value);
      return value.some((value: string) => muscleValues.includes(value));
    },
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
