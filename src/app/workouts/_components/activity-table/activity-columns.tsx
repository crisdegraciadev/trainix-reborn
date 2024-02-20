import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";
import NameCell from "@components/data-table/cells/name-cell";
import { DataTableColumnHeader } from "@components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DifficultyDataTable, MuscleTableData } from "@typings/table";
import { CheckCircle2 } from "lucide-react";

export type ActivityTableData = {
  id: string;
  name: string;
  description?: string;
  difficulty: DifficultyDataTable;
  muscles: MuscleTableData[];
  sets: number;
  reps: number;
  total: number;
  improve: string;
};

export const activityColumns: ColumnDef<ActivityTableData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <NameCell row={row} />,
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
    accessorKey: "sets",
    header: "Sets",
    cell: ({ row }) => {
      const sets: string = row.getValue("sets");
      return <div className="max-w-[50px]">{sets}</div>;
    },
  },
  {
    accessorKey: "reps",
    header: "Reps",
    cell: ({ row }) => {
      const reps: string = row.getValue("reps");
      return <div className="max-w-[50px]">{reps}</div>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const reps: number = Number(row.getValue("reps"));
      const sets: number = Number(row.getValue("sets"));
      return <div className="max-w-[50px]">{sets * reps}</div>;
    },
  },
  {
    accessorKey: "improve",
    header: "Improve",
    cell: ({ row }) => <CheckCircle2 strokeWidth={2} color="#2563eb" className="w6 h-6" />,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return <WorkoutActionsCell row={row} />;
  //   },
  // },
];
