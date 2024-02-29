import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import ActivityTable from "../activity-table/acitvity-table";
import { activityColumns } from "../activity-table/activity-columns";
import { Separator } from "@components/ui/separator";
import { Workout } from "@prisma/client";

type _Props = {
  workout: Workout;
};

export default function WorkoutProgression({ workout }: _Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression</CardTitle>
        <CardDescription>
          Document your workout progression here. Update your last workout to address progresive overload.
        </CardDescription>
      </CardHeader>
      <Separator className="mb-8" />
      <CardContent className="space-y-2">
        <ActivityTable data={[]} columns={activityColumns} />
      </CardContent>
    </Card>
  );
}
