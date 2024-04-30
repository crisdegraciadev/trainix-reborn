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
import { useWorkoutActions } from "./use-actions";
import { buttonVariants } from "@components/ui/button";
import { Loader2 } from "lucide-react";
import { WorkoutRow } from "@typings/entities/workout";
import { CustomCellProps } from "@components/data-table/types";
import { useWorkoutActionsContext } from "./actions-context";

export default function DeleteWorkoutDialog({ row }: CustomCellProps<WorkoutRow>) {
  const { deleteWorkout, isDeleteWorkoutLoading } = useWorkoutActions();
  const { isDeleteDialogOpen, toggleDeleteDialog } = useWorkoutActionsContext();

  const { id } = row.original;

  return (
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
  );
}
