"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

import { WorkoutWithRelations } from "@typings/entities/workout";
import { useState } from "react";
import { WorkoutProgressionContextProvider } from "./progression/progression-context";
import WorkoutProgression from "./progression/progression";
import WorkoutResume from "./resume/resume";

type _ = {
  workout: WorkoutWithRelations;
};

export type WorkoutActiveTab = "resume" | "progression";

export default function WorkoutDetails({ workout }: _) {
  const [activeTab, setActiveTab] = useState<string>("resume");

  const handleActiveTabChange = (activeTab: WorkoutActiveTab) => {
    setActiveTab(activeTab);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="progression">Progression</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <WorkoutResume workout={workout} onActiveTabChange={handleActiveTabChange} />
      </TabsContent>

      <TabsContent value="progression">
        <WorkoutProgressionContextProvider>
          <WorkoutProgression workout={workout} />
        </WorkoutProgressionContextProvider>
      </TabsContent>
    </Tabs>
  );
}
