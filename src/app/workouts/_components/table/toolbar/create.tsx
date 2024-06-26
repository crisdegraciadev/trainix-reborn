import CreateButton from "@components/create-button";
import { useState } from "react";
import WorkoutForm from "../../form/form";

export default function CreateWorkoutButton() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <CreateButton
      title="Create Workout"
      description="Add a new workout to your workout pull. Click save when you're done."
      label="Workout"
      disabled={false}
      disabledMessage="Exercises needed to create a workout"
      isDialogOpen={isCreateDialogOpen}
      setIsDialogOpen={setIsCreateDialogOpen}
    >
      <WorkoutForm type="create" onComplete={() => setIsCreateDialogOpen(false)} />
    </CreateButton>
  );
}
