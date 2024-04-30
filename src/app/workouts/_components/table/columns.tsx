import { DifficultyCell } from "@components/data-table/cells/difficulty-cell";
import { MusclesCell } from "@components/data-table/cells/muscles-cell";
import { DataTableColumnHeader } from "@components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import NameCell from "@components/data-table/cells/name-cell";
import { AppRoutes } from "@constants/routes";
import { NameValue } from "@typings/utils";
import { WorkoutRow } from "@typings/entities/workout";
import WorkoutActionsCell from "./actions/actions-cell";
import { WorkoutActionsContextProvider } from "./actions/actions-context";

export type WorkoutTableData = {
  id: string;
  name: string;
  description?: string;
  difficulty: NameValue;
  muscles: NameValue[];
};

export const workoutColumns: ColumnDef<WorkoutRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <NameCell row={row} path={AppRoutes.WORKOUTS} />,
    filterFn: (row, id, value) => {
      const rowValue: string = row.getValue(id);
      return rowValue.toUpperCase().includes(value.toUpperCase());
    },
  },
  {
    accessorKey: "description",
    header: "Description",
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
      const muscleValues = rowValues.map(({ value }) => value);
      return value.some((value: string) => muscleValues.includes(value));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <WorkoutActionsContextProvider>
          <WorkoutActionsCell row={row} />
        </WorkoutActionsContextProvider>
      );
    },
  },
];
