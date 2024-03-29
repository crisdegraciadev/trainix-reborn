"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@components/ui/card";

import WorkoutResume from "./workout-resume/workout-resume";
import { WorkoutDetails } from "@typings/entities/workout";
import WorkoutProgression from "./workout-progression/workout-progression";
import { WorkoutProgressionContextProvider } from "./workout-progression/workout-progression-context";

type _ = {
  workout: WorkoutDetails;
};

export default function WorkoutDetails({ workout }: _) {
  return (
    <Tabs defaultValue="resume" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="progression">Progression</TabsTrigger>
        <TabsTrigger value="exercises" disabled>
          Exercises
        </TabsTrigger>
        <TabsTrigger value="resources" disabled>
          Resources
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <WorkoutResume workout={workout} />
      </TabsContent>

      <TabsContent value="progression">
        <WorkoutProgressionContextProvider>
          <WorkoutProgression workout={workout} />
        </WorkoutProgressionContextProvider>
      </TabsContent>

      <TabsContent value="exercises">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
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
