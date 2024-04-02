import DataTableBody from "@components/data-table/data-table-body";
import DataTableHeader from "@components/data-table/data-table-header";
import DataTablePagination from "@components/data-table/data-table-pagination";
import { DataTableProps } from "@components/data-table/types";
import { Input } from "@components/ui/input";
import { Table } from "@components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import CreateButton from "@components/create-button";
import { WorkoutRow } from "@typings/entities/workout";
import CreateWorkoutForm from "../create-workout-form/create-workout-form";

export default function WorkoutTable<U>({ columns, data }: DataTableProps<WorkoutRow, U>) {
  // Table state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="h-8 w-64"
        />

        <CreateButton
          title="Create Workout"
          description="Add a new workout to your workout pull. Click save when you're done."
          label="Workout"
          disabled={false}
          disabledMessage="Exercises needed to create a workout"
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
        >
          <CreateWorkoutForm onComplete={() => setIsCreateDialogOpen(false)} />
        </CreateButton>
      </div>

      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
