import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@components/ui/table";
import { ArrowLeftRight, MoveDownRight, MoveUpRight } from "lucide-react";
import { useWorkoutResume } from "./use-workout-resume";
import { WorkoutDetails } from "@typings/entities/workout";

type _ = {
  workout: WorkoutDetails;
};

export default function WorkoutResume({ workout }: _) {
  const { currentProgression } = useWorkoutResume({ workout });

  return (
    <Card className="min-h-[400px]">
      <CardHeader>
        <CardTitle>Resume</CardTitle>
        <CardDescription>Sum up of your workout will be displayed here in detail.</CardDescription>
      </CardHeader>
      <Separator className="mb-8" />
      <CardContent className="flex gap-16">
        <div className="w-1/3">
          <h4 className="text-lg font-semibold mb-2">Description</h4>
          <p className="text-sm mb-6">{workout.description}</p>

          <h4 className="text-lg font-semibold mb-2">Difficulty</h4>
          <Badge className="mb-6">{workout.difficulty.name}</Badge>

          <h4 className="text-lg font-semibold mb-2">Muscles</h4>
          {workout.muscles.map(({ name }, idx) => (
            <Badge key={idx} variant="outline" className="me-1">
              {name}
            </Badge>
          ))}
        </div>
        <div className="w-2/3">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">Last Workout</h4>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[50px]">Sets</TableHead>
                  <TableHead className="w-[50px]">Reps</TableHead>
                  <TableHead className="w-[50px]">Total</TableHead>
                  <TableHead className="w-[50px]">Improve</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProgression?.activities.map((activity) => (
                  <TableRow key={activity.name}>
                    <TableCell className="px-4">{activity.name}</TableCell>
                    <TableCell className="px-4 text-center">{activity.sets}</TableCell>
                    <TableCell className="px-4 text-center">{activity.reps}</TableCell>
                    <TableCell className="px-4 text-center">
                      {activity.sets * activity.reps}
                    </TableCell>
                    <TableCell className="px-4 flex justify-center items-center">
                      {!activity.improve ? (
                        ""
                      ) : activity.improve.value === "+" ? (
                        <MoveUpRight className="w-4 h-4" />
                      ) : activity.improve.value === "-" ? (
                        <MoveDownRight className="w-4 h-4" />
                      ) : (
                        <ArrowLeftRight className="w-4 h-4" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
