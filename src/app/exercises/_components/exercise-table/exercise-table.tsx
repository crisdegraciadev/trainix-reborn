"use client";

import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@components/ui/table";
import { useState } from "react";
import { Input } from "@components/ui/input";
import DataTableHeader from "@components/data-table/data-table-header";
import DataTableBody from "@components/data-table/data-table-body";
import DataTablePagination from "@components/data-table/data-table-pagination";
import { DataTableProps } from "@components/data-table/types";
import CreateButton from "@components/create-button";
import ExerciseForm from "../exercise-form/exercise-form";

export default function ExerciseTable<T, U>({ columns, data }: DataTableProps<T, U>) {
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
          title="Create Exercise"
          description="Add a new exercise to your exercise pull. Click save when you're done."
          label="Exercise"
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
        >
          <ExerciseForm type="create" onComplete={() => setIsCreateDialogOpen(false)} />
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
