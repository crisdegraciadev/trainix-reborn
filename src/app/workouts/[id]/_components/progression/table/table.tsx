import DataTableBody from "@components/data-table/data-table-body";
import DataTableHeader from "@components/data-table/data-table-header";
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
import { useState } from "react";
import { ActivityWithExercise } from "@typings/entities/activity";
import ProgressionTableToolbar from "./toolbar";

export default function ProgressionTable<U>({
  columns,
  data,
}: DataTableProps<ActivityWithExercise, U>) {
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
      <ProgressionTableToolbar />

      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>
      </div>
    </div>
  );
}
