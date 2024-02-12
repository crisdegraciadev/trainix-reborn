import { Column, ColumnDef, Table } from "@tanstack/react-table";

export type DataTableProps<T> = { table: Table<T> };

export type DataTableHeaderProps<T> = DataTableProps<T>;

export type DataTableBodyProps<T, U> = DataTableProps<T> & { columns: ColumnDef<T, U>[] };

export type DataTablePaginationProps<T> = DataTableProps<T>;

export type DataTableColumnHeaderProps<T, U> = React.HTMLAttributes<HTMLDivElement> & {
  column: Column<T, U>;
  title: string;
};
