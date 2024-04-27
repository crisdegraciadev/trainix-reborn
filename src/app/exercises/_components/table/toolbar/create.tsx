import CreateButton from "@components/create-button";
import { useState } from "react";
import ExerciseForm from "../../form/exercise-form";

export default function CreateExerciseButton() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <CreateButton
      title="Create Exercise"
      description="Add a new exercise to your exercise pull. Click save when you're done."
      label="Exercise"
      isDialogOpen={isCreateDialogOpen}
      setIsDialogOpen={setIsCreateDialogOpen}
    >
      <ExerciseForm type="create" onComplete={() => setIsCreateDialogOpen(false)} />
    </CreateButton>
  );
}
