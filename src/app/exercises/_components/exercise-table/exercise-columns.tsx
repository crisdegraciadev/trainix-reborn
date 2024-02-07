"use client";

import { ColumnDef } from "@tanstack/react-table";
import MusclesCell from "./muscles-cell";
import ExerciseActionsCell from "./exercise-actions-cell";
import DifficultyCell from "./difficulty-cell";

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
