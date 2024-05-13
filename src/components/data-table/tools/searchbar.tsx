import { Input } from "@components/ui/input";
import { Table } from "@tanstack/react-table";

export type TableSearchBarProps<T> = {
  table: Table<T>;
  columnName: string;
};

export default function TableSearchbar<T>({ table, columnName }: TableSearchBarProps<T>) {
  return (
    <Input
      placeholder="Filter name..."
      value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn(columnName)?.setFilterValue(event.target.value)}
      className="h-8 w-full xl:w-64"
    />
  );
}
