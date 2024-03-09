import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import ProgressionTable from "../progression-table/progression-table";
import { progressionColumns } from "../progression-table/progression-columns";
import { useWorkoutProgression } from "./use-workout-progression";
import { WorkoutDetails } from "@typings/entities/workout";

type _ = {
  workout: WorkoutDetails;
};

export default function WorkoutProgression({ workout }: _) {
  const { currentProgression, currentProgressionDate, progressionDates } = useWorkoutProgression({
    workout,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression</CardTitle>
        <CardDescription>
          Document your workout progression here. Update your last workout to address progresive
          overload.
        </CardDescription>
      </CardHeader>
      <Separator className="mb-8" />
      <CardContent className="space-y-2">
        {currentProgression && currentProgressionDate ? (
          <ProgressionTable
            workoutId={workout.id}
            data={currentProgression.activities}
            columns={progressionColumns}
            options={{
              currentProgressionDate,
              progressionDates: [...progressionDates],
            }}
          />
        ) : (
          <p>Loading</p>
        )}
      </CardContent>
    </Card>
  );
}
