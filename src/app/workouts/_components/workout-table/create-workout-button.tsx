"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import WorkoutForm from "../workout-form/workout-form";

export default function CreateWorkoutButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs ml-auto h-8 flex"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md flex flex-col gap-0">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">Create Workout</DialogTitle>
          <DialogDescription>
            Add a new workout to your workout pull. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <WorkoutForm type="create" onComplete={() => setIsFormOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
