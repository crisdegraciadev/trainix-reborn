"use client";

import { CustomCellProps } from "@components/data-table/types";
import { WorkoutTableData } from "./workout-columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { Button, buttonVariants } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { MoreHorizontal, Trash2, Pencil, Loader2 } from "lucide-react";
import { useWorkoutActions } from "./use-workout-actions";
import WorkoutForm from "../workout-form/workout-form";
import { WorkoutRow } from "@typings/entities/workout";

export default function WorkoutActionsCell({ row }: CustomCellProps<WorkoutRow>) {
  const {
    deleteWorkout,
    toggleDeleteDialog,
    isDeleteDialogOpen,
    isDeleteWorkoutLoading,
    toggleUpdateDialog,
    isUpdateDialogOpen,
  } = useWorkoutActions();

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
              This action cannot be undone. This will permanently delete your workout and remove the
              workouts that make use of it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleteWorkoutLoading}
              onClick={() => deleteWorkout({ id })}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isDeleteWorkoutLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit confirm dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={toggleUpdateDialog}>
        <DialogContent className="max-w-md flex flex-col gap-0">
          <DialogHeader className="mb-4">
            <DialogTitle>Update workout</DialogTitle>
            <DialogDescription>
              Update a workout from your workout pull. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <WorkoutForm
            type="update"
            rowData={row.original}
            onComplete={() => toggleUpdateDialog()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
