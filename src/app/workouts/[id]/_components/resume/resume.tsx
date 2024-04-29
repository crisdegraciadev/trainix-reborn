import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { CircleCheck } from "@components/ui/custom-icons";
import { Separator } from "@components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { ProgressionDetails } from "@typings/entities/progression";
import { WorkoutWithRelations } from "@typings/entities/workout";
import { Circle, CircleX } from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { WorkoutActiveTab } from "../details";
import { useWorkoutResume } from "./use-resume";

type _ = {
  workout: WorkoutWithRelations;
  onActiveTabChange: (v: WorkoutActiveTab) => void;
};

function ResumeBody({ children, workout }: PropsWithChildren & Pick<_, "workout">) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
        <CardDescription>Sum up of your workout will be displayed here in detail.</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="flex gap-16 pb-0">
        <div className="w-1/3 my-8">
          {workout.description && (
            <>
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="text-sm mb-6">{workout.description}</p>
            </>
          )}

          <h4 className="text-lg font-semibold mb-2">Difficulty</h4>
          <Badge className="mb-6">{workout.difficulty.name}</Badge>

          <h4 className="text-lg font-semibold mb-2">Muscles</h4>
          {workout.muscles.map(({ name }, idx) => (
            <Badge key={idx} variant="outline" className="me-1">
              {name}
            </Badge>
          ))}
        </div>

        <div>
          <Separator orientation="vertical" />
        </div>
        <div className="w-2/3 my-8">{children}</div>
      </CardContent>
    </Card>
  );
}

function ResumeContentEmpty({ onActiveTabChange }: Pick<_, "onActiveTabChange">) {
  const handleClick = () => {
    onActiveTabChange("progression");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/1.svg" alt="not found" width={120} height={120} />
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-3 flex items-center gap-1">
        No progression found
      </h4>
      <p className="mt-3 text-center">
        Create yout first progression on <b>Progression</b> tab and <br /> start tracking your
        progress.
      </p>
      <Button className="mt-3" onClick={handleClick}>
        Go to Progression
      </Button>
    </div>
  );
}

function ResumeContent({ currentProgression }: { currentProgression: ProgressionDetails }) {
  return (
    <div>
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">Last Workout</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[50px]">Sets</TableHead>
            <TableHead className="w-[50px]">Reps</TableHead>
            <TableHead className="w-[50px]">Total</TableHead>
            <TableHead className="w-[150px]">Improve</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentProgression.activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="px-4">{activity.name}</TableCell>
              <TableCell className="px-4 text-center">{activity.sets}</TableCell>
              <TableCell className="px-4 text-center">{activity.reps}</TableCell>
              <TableCell className="px-4 text-center">{activity.sets * activity.reps}</TableCell>
              <TableCell className="px-4 flex items-center">
                {!activity.improve ? (
                  ""
                ) : activity.improve.value === "+" ? (
                  <div className="flex items-center">
                    <CircleCheck className="w-4 h-4 mr-2 text-green-600" />
                    Move On
                  </div>
                ) : activity.improve.value === "-" ? (
                  <div className="flex items-center">
                    <CircleX className="w-4 h-4 mr-2 text-red-600" />
                    Slow Down
                  </div>
                ) : (
                  <div className="flex items-center w-48">
                    <Circle className="w-4 h-4 mr-2 text-blue-600" />
                    Keep Working
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function WorkoutResume({ workout, onActiveTabChange }: _) {
  const { currentProgression } = useWorkoutResume({ workout });

  return (
    <ResumeBody workout={workout}>
      {currentProgression ? (
        <ResumeContent currentProgression={currentProgression} />
      ) : (
        <ResumeContentEmpty onActiveTabChange={onActiveTabChange} />
      )}
    </ResumeBody>
  );
}
