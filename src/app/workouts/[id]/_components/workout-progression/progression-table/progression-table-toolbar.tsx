import CreateButton from "@components/create-button";
import { DatePicker } from "@components/ui/date-picker";
import ProgressionForm from "../progression-form/progression-form";
import { useWorkoutProgressionContext } from "../workout-progression-context";

export default function ProgressionTableToolbar() {
  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    progressionTimeData: { selectedDate, matchDates },
    setProgressionTimeData,
  } = useWorkoutProgressionContext();

  return (
    <div className="flex justify-between mb-4">
      <DatePicker
        selectedDate={selectedDate}
        matchDates={matchDates}
        disableAllExceptMatchDates={true}
        onDatePicked={(selectedDate: Date) => {
          setProgressionTimeData((state) => ({ ...state, selectedDate }));
        }}
      />

      <CreateButton
        title="Create Progression"
        description="Add a new progression to your workout. Click save when you're done."
        label="Progression"
        isDialogOpen={isCreateDialogOpen}
        setIsDialogOpen={setIsCreateDialogOpen}
      >
        <ProgressionForm />
      </CreateButton>
    </div>
  );
}
