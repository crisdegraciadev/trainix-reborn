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
import CreateExerciseButton from "./create-exercise-button";
import { DataTableProps } from "@components/data-table/types";

export default function ExerciseTable<T, U>({ columns, data }: DataTableProps<T, U>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

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

        <CreateExerciseButton />
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
