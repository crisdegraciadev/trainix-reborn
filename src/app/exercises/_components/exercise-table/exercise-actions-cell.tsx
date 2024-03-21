"use client";

import { Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { Button, buttonVariants } from "@components/ui/button";
import { useExerciseActions } from "./use-exercise-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import ExerciseForm from "../exercise-form/exercise-form";
import { CustomCellProps } from "@components/data-table/types";
import { ExerciseRow } from "@typings/entities/exercise";

export default function ExerciseActionsCell({ row }: CustomCellProps<ExerciseRow>) {
  const {
    deleteExercise,
    toggleDeleteDialog,
    isDeleteDialogOpen,
    isDeleteExerciseLoading,
    toggleUpdateDialog,
    isUpdateDialogOpen,
  } = useExerciseActions();

  const { id } = row.original;

  return (
    <div className="w-[10px]">
      <div className="flex justify-end">
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

      {/* Delete confirm dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={toggleDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your exercise and remove
              the workouts that make use of it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleteExerciseLoading}
              onClick={() => deleteExercise({ id })}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isDeleteExerciseLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit confirm dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={toggleUpdateDialog}>
        <DialogContent className="max-w-md flex flex-col gap-0">
          <DialogHeader className="mb-4">
            <DialogTitle>Update exercise</DialogTitle>
            <DialogDescription>
              Update a exercise from your exercise pull. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ExerciseForm
            type="update"
            rowData={row.original}
            onComplete={() => toggleUpdateDialog()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
