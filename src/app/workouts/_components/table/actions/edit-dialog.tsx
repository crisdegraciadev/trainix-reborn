import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { WorkoutRow } from "@typings/entities/workout";
import WorkoutForm from "../../form/form";
import { useWorkoutActionsContext } from "./actions-context";

type _ = {
  row: Row<WorkoutRow>;
};

export default function EditWorkoutDialog({ row }: _) {
  const { toggleUpdateDialog, isUpdateDialogOpen } = useWorkoutActionsContext();

  return (
    <Dialog open={isUpdateDialogOpen} onOpenChange={toggleUpdateDialog}>
      <DialogContent className="max-w-md flex flex-col gap-0">
        <DialogHeader className="mb-4">
          <DialogTitle>Update exercise</DialogTitle>
          <DialogDescription>
            Update a exercise from your exercise pull. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <WorkoutForm type="update" rowData={row.original} onComplete={() => toggleUpdateDialog()} />
      </DialogContent>
    </Dialog>
  );
}
