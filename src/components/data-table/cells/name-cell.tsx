"use client";

import { useRouter } from "next/navigation";
import { CustomCellProps } from "../types";
import { Row } from "@tanstack/react-table";

export default function NameCell<T>({ row, path }: CustomCellProps<T> & { path?: string }) {
  const router = useRouter();

  const redirectToEntity = () => {
    if (path && hasRowId(row)) {
      const { id } = row.original;
      router.push(`${path}/${id}`);
    }
  };

  const hasRowId = (row: unknown): row is Row<{ id: string }> => {
    return !!(row as Row<{ id: string }>).id;
  };

  return (
    <div className="w-[80px] cursor-pointer" onClick={redirectToEntity}>
      <span className="w-[50px] truncate font-medium">{row.getValue("name")}</span>
    </div>
  );
}
