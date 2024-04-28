import DataTableBody from "@components/data-table/data-table-body";
import DataTableHeader from "@components/data-table/data-table-header";
import DataTablePagination from "@components/data-table/data-table-pagination";
import { DataTableProps } from "@components/data-table/types";
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
import { WorkoutRow } from "@typings/entities/workout";
import { useState } from "react";
import WorkoutToolbar from "./toolbar/toolbar";

export default function WorkoutTable<U>({ columns, data }: DataTableProps<WorkoutRow, U>) {
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
      <WorkoutToolbar table={table} />

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
