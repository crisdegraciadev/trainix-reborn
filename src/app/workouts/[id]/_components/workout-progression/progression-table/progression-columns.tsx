import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";
import NameCell from "@components/data-table/cells/name-cell";
import { CircleCheck } from "@components/ui/custom-icons";

import { ColumnDef } from "@tanstack/react-table";
import { ActivityWithExercise } from "@typings/entities/activity";
import { Improve } from "@typings/entities/improve";
import { Circle, CircleX } from "lucide-react";

export const progressionColumns: ColumnDef<ActivityWithExercise>[] = [
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
    header: "Improvement",
    cell: ({ row }) => {
      const improve: Improve = row.getValue("improve");

      console.log({ improve });

      if (!improve) {
        return "";
      }

      const { value } = improve;

      if (value === "+") {
        return (
          <div className="flex items-center">
            <CircleCheck className="w-4 h-4 mr-2 text-green-600" />
            Move On
          </div>
        );
      }

      if (value === "-") {
        return (
          <div className="flex items-center">
            <CircleX className="w-4 h-4 mr-2 text-red-600" />
            Slow Down
          </div>
        );
      }

      return (
        <div className="flex items-center">
          <Circle className="w-4 h-4 mr-2 text-blue-600" />
          Maintain
        </div>
      );
    },
  },
];
