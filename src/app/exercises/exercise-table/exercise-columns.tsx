"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

export type Muscle = {
  name: string;
};

export type ExerciseTableData = {
  name: string;
  description: string | null;
  muscles: Muscle[];
};

export const exerciseColumns: ColumnDef<ExerciseTableData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "muscles",
    header: "Muscles",
    cell: ({ row }) => {
      const muscles: Muscle[] = row.getValue("muscles");
      return (
        <div className="flex flex-wrap gap-1">
          {muscles.length > 5
            ? muscles.slice(0, 5).map(({ name }, idx) => (
                <Badge key={idx} variant="outline">
                  {name}
                </Badge>
              ))
            : muscles.map(({ name }, idx) => (
                <Badge key={idx} variant="outline">
                  {name}
                </Badge>
              ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
