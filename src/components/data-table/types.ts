import { Column, ColumnDef, Table, Row } from "@tanstack/react-table";

export type CustomCellProps<T> = { row: Row<T> };

export type DataTableProps<T, U> = { columns: ColumnDef<T, U>[]; data: T[] };

export type DataTableHeaderProps<T> = { table: Table<T> };

export type DataTableBodyProps<T, U> = { table: Table<T>; columns: ColumnDef<T, U>[] };

export type DataTablePaginationProps<T> = { table: Table<T> };

export type DataTableColumnHeaderProps<T, U> = React.HTMLAttributes<HTMLDivElement> & {
  column: Column<T, U>;
  title: string;
};
