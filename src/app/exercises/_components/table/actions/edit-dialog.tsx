import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import ExerciseForm from "../../form/exercise-form";
import { useExerciseActionsContext } from "./actions-context";
import { ExerciseRow } from "@typings/entities/exercise";
import { Row } from "@tanstack/react-table";

type _ = {
  row: Row<ExerciseRow>;
};

export default function EditExerciseDialog({ row }: _) {
  const { toggleUpdateDialog, isUpdateDialogOpen } = useExerciseActionsContext();

  return (
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
  );
}
