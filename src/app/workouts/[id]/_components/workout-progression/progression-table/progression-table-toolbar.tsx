import CreateButton from "@components/create-button";
import { DatePicker } from "@components/ui/date-picker";
import ProgressionForm from "../progression-form/progression-form";
import { useWorkoutProgressionContext } from "../workout-progression-context";

export default function ProgressionTableToolbar() {
  const {
    workoutId,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    progressionTimeData: { selectedDate, matchDates },
  } = useWorkoutProgressionContext();

  if (!workoutId) {
    return <p>Loading...</p>;
  }

  console.log({ selectedDate });

  return (
    <div className="flex justify-between mb-4">
      <DatePicker
        selectedDate={selectedDate}
        matchDates={matchDates}
        onDatePicked={(date: Date) => {
          console.log({ date });
        }}
      />

      <CreateButton
        title="Create Progression"
        description="Add a new progression to your workout. Click save when you're done."
        label="Progression"
        isDialogOpen={isCreateDialogOpen}
        setIsDialogOpen={setIsCreateDialogOpen}
      >
        <ProgressionForm workoutId={workoutId} onComplete={() => setIsCreateDialogOpen(false)} />
      </CreateButton>
    </div>
  );
}
