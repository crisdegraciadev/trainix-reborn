import { useToast } from "@components/ui/use-toast";
import { trpc } from "@procedures/client";
import { useEffect, useState } from "react";

export const useDeleteExercise = () => {
  const utils = trpc.useUtils();

  const { mutate, isLoading, isSuccess, isError } = trpc.exercises.deleteExercise.useMutation();

  const [isMutationLoading, setIsMutationLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "default",
        title: "Exercise deleted.",
        description: "The exercise has been deleted.",
      });

      utils.exercises.findAllExercises.invalidate();

      setIsMutationLoading(false);
      setIsDialogOpen(false);
    }
  }, [isSuccess, toast, utils]);

  useEffect(() => {
    if (isLoading) {
      setIsMutationLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Error deleting exercise.",
        description: "There was an unexpected error deleting the exericse.",
      });

      setIsMutationLoading(false);
      setIsDialogOpen(false);
    }
  }, [isError, toast]);

  const toggleDialog = () => {
    setIsDialogOpen((state) => !state);
  };

  return {
    deleteExercise: mutate,
    isDialogOpen,
    isMutationLoading,
    toggleDialog,
  };
};
