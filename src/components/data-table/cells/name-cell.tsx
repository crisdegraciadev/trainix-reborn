"use client";

import { useRouter } from "next/navigation";
import { CustomCellProps } from "../types";
import { Row } from "@tanstack/react-table";
import { truncate } from "@utils/truncate";
import { cn } from "@lib/utils";

type _<T> = CustomCellProps<T> & { path?: string; split?: number; width?: number };

export default function NameCell<T>({ row, path, split, width }: _<T>) {
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

  const value: string = row.getValue("name");
  const content = split ? truncate(value, split) : value;

  return (
    <div
      className={cn(`w-[${width ?? 100}px]`, path ? "cursor-pointer" : "")}
      onClick={redirectToEntity}
    >
      <span className="w-[50px] truncate font-medium">{content}</span>
    </div>
  );
}
