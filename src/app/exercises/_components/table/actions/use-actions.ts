import { useToast } from "@components/ui/use-toast";
import { useDeleteExercise } from "@hooks/exercises/use-delete-exercise";
import { useEffect } from "react";
import { useExerciseActionsContext } from "./actions-context";

export const useExerciseActions = () => {
  const { setIsDeleteDialogOpen } = useExerciseActionsContext();

  const {
    deleteExercise,
    isDeleteExerciseSuccess,
    isDeleteExerciseLoading,
    isDeleteExerciseError,
  } = useDeleteExercise();

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
  }, [isDeleteExerciseSuccess, setIsDeleteDialogOpen, toast]);

  useEffect(() => {
    if (isDeleteExerciseError) {
      toast({
        variant: "destructive",
        title: "Error deleting exercise.",
        description: "There was an unexpected error deleting the exericse.",
      });

      setIsDeleteDialogOpen(false);
    }
  }, [isDeleteExerciseError, setIsDeleteDialogOpen, toast]);

  return {
    deleteExercise,
    isDeleteExerciseLoading,
  };
};
