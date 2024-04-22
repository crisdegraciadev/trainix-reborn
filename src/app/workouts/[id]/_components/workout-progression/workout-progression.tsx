import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { WorkoutDetails } from "@typings/entities/workout";
import WorkoutDetailsSkeleton from "../workout-details-skeleton";
import { progressionColumns } from "./progression-table/progression-columns";
import ProgressionTable from "./progression-table/progression-table";
import { useWorkoutProgression } from "./use-workout-progression";

type _ = {
  workout: WorkoutDetails;
};

export default function WorkoutProgression({ workout }: _) {
  const { currentProgression } = useWorkoutProgression({
    workout,
  });

  if (!currentProgression) {
    return (
      <WorkoutDetailsSkeleton
        title="Progression"
        description="Document your workout progression here. Update your last workout to address progresive overload."
      />
    );
  }

  const { activities } = currentProgression;

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
        <ProgressionTable data={activities} columns={progressionColumns} />
      </CardContent>
    </Card>
  );
}
