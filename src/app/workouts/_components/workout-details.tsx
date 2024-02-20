"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Workout } from "@typings/entities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@components/ui/card";
import { Separator } from "@components/ui/separator";

import WorkoutResume from "./workout-details/workout-resume";
import ActivityTable from "./activity-table/acitvity-table";
import { activityColumns } from "./activity-table/activity-columns";
import WorkoutProgression from "./workout-details/workout-progression";

type Props = {
  workout: Workout;
};

export default function WorkoutDetails({ workout }: Props) {
  return (
    <Tabs defaultValue="resume" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="progression">Progression</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <WorkoutResume workout={workout} />
      </TabsContent>

      <TabsContent value="progression">
        <WorkoutProgression />
      </TabsContent>

      <TabsContent value="exercises">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, youll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
