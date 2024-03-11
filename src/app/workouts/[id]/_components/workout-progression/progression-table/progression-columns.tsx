import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";
import NameCell from "@components/data-table/cells/name-cell";
import { ColumnDef } from "@tanstack/react-table";
import { ActivityMerge } from "@typings/entities/activity";
import { Improve } from "@typings/entities/improve";
import { BadgeData } from "@typings/utils";
import { ArrowLeftRight, CheckCircle2, MoveDownRight, MoveUpRight } from "lucide-react";

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
      return <div className="max-w-[50px] flex justify-center">{sets}</div>;
    },
  },
  {
    accessorKey: "reps",
    header: "Reps",
    cell: ({ row }) => {
      const reps: string = row.getValue("reps");
      return <div className="max-w-[50px] flex justify-center">{reps}</div>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total: number = Number(row.getValue("total"));
      return <div className="max-w-[50px] flex justify-center">{total}</div>;
    },
  },
  {
    accessorKey: "improve",
    header: "Improve",
    cell: ({ row }) => {
      const improve: Improve = row.getValue("improve");

      if (!improve) {
        return "";
      }

      const { value } = improve;

      if (value === "+") {
        return (
          <div className="w-[65px] flex justify-center">
            <MoveUpRight className="w-4 h-4" />
          </div>
        );
      }

      if (value === "-") {
        return (
          <div className="w-[65px] flex justify-center">
            <MoveDownRight className="w-4 h-4" />
          </div>
        );
      }

      return (
        <div className="w-[65px] flex justify-center">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      );
    },
  },
];
