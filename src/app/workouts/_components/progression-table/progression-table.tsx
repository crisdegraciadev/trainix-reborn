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
import { useState } from "react";
import { ProgressionTableData } from "./progression-columns";
import CreateButton from "@components/create-button";
import { DatePicker } from "@components/ui/date-picker";

export default function ProgressionTable<U>({
  columns,
  data,
}: DataTableProps<ProgressionTableData, U>) {
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
        <DatePicker />
        <CreateButton
          title="Create Progression"
          description="Add a new progression to your workout. Click save when you're done."
          label="Progression"
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
        >
          <div>Activity Form</div>
        </CreateButton>
      </div>

      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>
      </div>
    </div>
  );
}
