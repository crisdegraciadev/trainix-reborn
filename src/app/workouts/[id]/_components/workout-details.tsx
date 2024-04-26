"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

import { WorkoutWithRelations } from "@typings/entities/workout";
import WorkoutProgression from "./workout-progression/workout-progression";
import { WorkoutProgressionContextProvider } from "./workout-progression/workout-progression-context";
import WorkoutResume from "./workout-resume/workout-resume";

type _ = {
  workout: WorkoutWithRelations;
};

export default function WorkoutDetails({ workout }: _) {
  return (
    <Tabs defaultValue="resume" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="progression">Progression</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <WorkoutResume workout={workout} />
      </TabsContent>

      <TabsContent value="progression">
        <WorkoutProgressionContextProvider>
          <WorkoutProgression workout={workout} />
        </WorkoutProgressionContextProvider>
      </TabsContent>
    </Tabs>
  );
}
