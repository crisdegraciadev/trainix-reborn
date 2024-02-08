import { useToast } from "@components/ui/use-toast";
import { useDeleteExercise } from "@hooks/exercises/use-delete-exercise";
import { useUpdateExercise } from "@hooks/exercises/use-update-exercise";
import { useState, useEffect } from "react";

export const useExerciseActions = () => {
  const { deleteExercise, isDeleteExerciseSuccess, isDeleteExerciseLoading, isDeleteExerciseError } =
    useDeleteExercise();

  const { updateExercise, isUpdateExerciseSuccess, isUpdateExerciseLoading, isUpdateExerciseError } =
    useUpdateExercise();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (isDeleteExerciseSuccess) {
      toast({
        variant: "default",
        title: "Exercise deleted.",
        description: "The exercise has been deleted.",
      });

      setIsDeleteDialogOpen(false);
    }
  }, [isDeleteExerciseSuccess, toast]);

  useEffect(() => {
    if (isDeleteExerciseError) {
      toast({
        variant: "destructive",
        title: "Error deleting exercise.",
        description: "There was an unexpected error deleting the exericse.",
      });

      setIsDeleteDialogOpen(false);
    }
  }, [isDeleteExerciseError, toast]);

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((state) => !state);
  };

  const toggleUpdateDialog = () => {
    setIsUpdateDialogOpen((state) => !state);
  };

  return {
    deleteExercise,
    toggleDeleteDialog,
    isDeleteDialogOpen,
    isDeleteExerciseLoading,
    updateExercise,
    toggleUpdateDialog,
    isUpdateDialogOpen,
    isUpdateExerciseLoading,
  };
};
