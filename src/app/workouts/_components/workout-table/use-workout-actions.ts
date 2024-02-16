"use client";

import { useToast } from "@components/ui/use-toast";
import { useDeleteWorkout } from "@hooks/workouts/use-delete-workout";
import { useState, useEffect } from "react";

export const useWorkoutActions = () => {
  const { deleteWorkout, isDeleteWorkoutSuccess, isDeleteWorkoutLoading, isDeleteWorkoutError } = useDeleteWorkout();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (isDeleteWorkoutSuccess) {
      toast({
        variant: "default",
        title: "Workout deleted.",
        description: "The workout has been deleted.",
      });

      setIsDeleteDialogOpen(false);
    }
  }, [isDeleteWorkoutSuccess, toast]);

  useEffect(() => {
    if (isDeleteWorkoutError) {
      toast({
        variant: "destructive",
        title: "Error deleting workout.",
        description: "There was an unexpected error deleting the workout.",
      });

      setIsDeleteDialogOpen(false);
    }
  }, [isDeleteWorkoutError, toast]);

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((state) => !state);
  };

  const toggleUpdateDialog = () => {
    setIsUpdateDialogOpen((state) => !state);
  };

  return {
    deleteWorkout,
    toggleDeleteDialog,
    isDeleteDialogOpen,
    isDeleteWorkoutLoading,
    toggleUpdateDialog,
    isUpdateDialogOpen,
  };
};
