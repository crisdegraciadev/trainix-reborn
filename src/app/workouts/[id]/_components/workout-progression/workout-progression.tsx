import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { useWorkoutProgression } from "./use-workout-progression";
import { WorkoutDetails } from "@typings/entities/workout";
import ProgressionTable from "./progression-table/progression-table";
import { progressionColumns } from "./progression-table/progression-columns";

type _ = {
  workout: WorkoutDetails;
};

export default function WorkoutProgression({ workout }: _) {
  const { currentProgression } = useWorkoutProgression({
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
        {currentProgression ? (
          <ProgressionTable data={currentProgression.activities} columns={progressionColumns} />
        ) : (
          <p>Loading</p>
        )}
      </CardContent>
    </Card>
  );
}
