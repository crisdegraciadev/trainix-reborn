import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { useExerciseActionsContext } from "./actions-context";
import { useExerciseActions } from "./use-actions";
import { buttonVariants } from "@components/ui/button";
import { Loader2 } from "lucide-react";

type _ = {
  id: string;
};

export default function DeleteExerciseDialog({ id }: _) {
  const { isDeleteExerciseLoading, deleteExercise } = useExerciseActions();
  const { isDeleteDialogOpen, toggleDeleteDialog } = useExerciseActionsContext();

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={toggleDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your exercise and remove the
            workouts that make use of it.
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
  );
}
