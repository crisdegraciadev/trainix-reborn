import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { useWorkoutProgression } from "./use-workout-progression";
import { WorkoutDetails } from "@typings/entities/workout";
import ProgressionTable from "./progression-table/progression-table";
import { progressionColumns } from "./progression-table/progression-columns";
import { LoaderCircle } from "lucide-react";

type _ = {
  workout: WorkoutDetails;
};

export default function WorkoutProgression({ workout }: _) {
  const { currentProgression } = useWorkoutProgression({
    workout,
  });

  if (!currentProgression) {
    return (
      <div className="w-full pt-64 flex flex-col items-center">
        <LoaderCircle className="animate-spin w-20 h-20" />
        <p className="leading-7 [&:not(:first-child)]:mt-6">Loading workout progressions...</p>
      </div>
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
