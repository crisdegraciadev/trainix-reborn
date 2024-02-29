import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Carousel, CarouselContent } from "@components/ui/carousel";
import { Separator } from "@components/ui/separator";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@components/ui/table";
import { CheckCircle2, XCircle, PauseCircle } from "lucide-react";
import { useMemo } from "react";
import { useWorkoutDetails } from "./use-workout-details";
import { Workout } from "@prisma/client";
import { WorkoutWithDeps } from "@typings/entities";

type _Props = {
  workout: WorkoutWithDeps;
};

const activities = [
  {
    name: "Pull Ups",
    sets: 4,
    reps: 12,
    total: 48,
    improve: "+",
  },
  {
    name: "Band Assisted Pull Ups",
    sets: 2,
    reps: 8,
    total: 16,
    improve: "+",
  },
  {
    name: "Straight Bar Dips",
    sets: 4,
    reps: 10,
    total: 16,

    improve: "=",
  },
  {
    name: "Rows",
    sets: 3,
    reps: 15,
    total: 16,
    improve: "+",
  },
];

export default function WorkoutResume({ workout }: _Props) {
  const { lastWorkoutProgression } = useWorkoutDetails({ workout });
  console.log({ lastWorkoutProgression });

  if (!lastWorkoutProgression) {
    return <p>loading</p>;
  }

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
                {lastWorkoutProgression.activities.map((activity) => (
                  <TableRow key={activity.exercise.name}>
                    <TableCell className="px-4">{activity.exercise.name}</TableCell>
                    <TableCell className="px-4 text-center">{activity.sets}</TableCell>
                    <TableCell className="px-4 text-center">{activity.reps}</TableCell>
                    <TableCell className="px-4 text-center">{activity.sets * activity.reps}</TableCell>
                    <TableCell className="px-4 flex justify-center items-center">
                      {/* {activity.improve === "+" ? (
                        <CheckCircle2 strokeWidth={2} color="#2563eb" className="w6 h-6" />
                      ) : activity.improve === "-" ? (
                        <XCircle color="#e11d48" strokeWidth={2} className="w6 h-6" />
                      ) : ( */}
                      <PauseCircle strokeWidth={2} color="#94a3b8" className="w-6 h-6" />
                      {/* )} */}
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
