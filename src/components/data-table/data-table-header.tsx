import { TableHead, TableHeader, TableRow } from "@components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { DataTableHeaderProps } from "./types";

export default function DataTableHeader<T>({ table }: DataTableHeaderProps<T>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
