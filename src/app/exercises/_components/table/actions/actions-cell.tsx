"use client";

import { CustomCellProps } from "@components/data-table/types";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ExerciseRow } from "@typings/entities/exercise";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useExerciseActionsContext } from "./actions-context";
import DeleteExerciseDialog from "./delete-dialog";
import EditExerciseDialog from "./edit-dialog";

export default function ExerciseActionsCell({ row }: CustomCellProps<ExerciseRow>) {
  const { toggleDeleteDialog, toggleUpdateDialog } = useExerciseActionsContext();

  const { id } = row.original;

  return (
    <div className="w-[10px]">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" data-cy="exercise-actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex justify-start items-center"
              onClick={toggleDeleteDialog}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex justify-start items-center"
              onClick={toggleUpdateDialog}
            >
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteExerciseDialog id={id} />

      <EditExerciseDialog row={row} />
    </div>
  );
}
