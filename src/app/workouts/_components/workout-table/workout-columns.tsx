import { DataTableColumnHeader } from "@components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DifficultyDataTable, MuscleTableData } from "@typings/table";

export type WorkoutTableData = {
  id: string;
  name: string;
  description?: string;
  difficulty: DifficultyDataTable;
  muscles: MuscleTableData[];
};

export const workoutColumns: ColumnDef<WorkoutTableData>[] = [
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "muscles",
    header: "Muscles",
  },
  {
    id: "actions",
  },
];
