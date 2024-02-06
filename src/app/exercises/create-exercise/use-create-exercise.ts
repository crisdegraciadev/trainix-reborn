import { useEffect, useState } from "react";
import { trpc } from "../../../trpc/client";
import { useToast } from "../../../components/ui/use-toast";

export const useCreateExercise = () => {
  const utils = trpc.useUtils();

  const { mutate, isSuccess, isError, isLoading } =
    trpc.createExercise.useMutation({
      onSuccess: () => utils.findAllExercises.invalidate(),
    });

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "default",
        title: "Exercise created.",
        description: "The exercise has been created.",
      });

      setIsFormLoading(false);
      setIsFormOpen(false);
    }
  }, [isSuccess, toast, setIsFormLoading]);

  useEffect(() => {
    if (isLoading) {
      setIsFormLoading(true);
    }
  }, [isLoading, setIsFormLoading]);

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Error creating exericse.",
        description: "There was an unexpected error creating the exericse.",
      });
    }
  }, [isError, toast]);

  const toggleForm = () => {
    setIsFormOpen((state) => !state);
  };

  return {
    createExercise: mutate,
    isFormLoading,
    isFormOpen,
    toggleForm,
  };
};
