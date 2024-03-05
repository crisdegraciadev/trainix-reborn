import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";
import NameCell from "@components/data-table/cells/name-cell";
import { ColumnDef } from "@tanstack/react-table";
import { ActivityMerge } from "@typings/entities/activity";
import { BadgeData } from "@typings/utils";
import { CheckCircle2 } from "lucide-react";

export const progressionColumns: ColumnDef<ActivityMerge>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <NameCell row={row} split={30} width={110} />,
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
      const total: number = Number(row.getValue("total"));
      return <div className="max-w-[50px]">{total}</div>;
    },
  },
  {
    accessorKey: "improve",
    header: "Improve",
    cell: ({ row }) => {
      const value = row.getValue("improve");

      if (value === true) {
        return <CheckCircle2 strokeWidth={2} color="#2563eb" className="w6 h-6" />;
      }

      if (value === false) {
        return <CheckCircle2 strokeWidth={2} color="#2563eb" className="w6 h-6" />;
      }

      return <CheckCircle2 strokeWidth={2} color="#2563eb" className="w6 h-6" />;
    },
  },
];
