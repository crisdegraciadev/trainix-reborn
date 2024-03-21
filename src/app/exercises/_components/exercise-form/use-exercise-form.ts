import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExerciseFormSchema, exerciseSchema } from "./exercise-schema";
import { TOAST_MESSAGES } from "./toast-messages";
import { ExerciseRow } from "@typings/entities/exercise";
import { useExerciseMutations } from "./use-exercise-mutations";
import { redirect } from "next/navigation";
import { AppRoutes } from "@constants/routes";
import { useExerciseQueries } from "./use-exercise-queries";

type BaseProps = {
  onComplete: () => void;
};

export type ExerciseFormProps = BaseProps &
  ({ type: "create"; rowData?: null } | { type: "update"; rowData: ExerciseRow });

export const useExerciseForm = ({ type, rowData, onComplete }: ExerciseFormProps) => {
  const {
    isCreateExerciseSuccess,
    isCreateExerciseLoading,
    isCreateExerciseError,
    isUpdateExerciseSuccess,
    isUpdateExerciseLoading,
    isUpdateExerciseError,
    createExercise,
    updateExercise,
  } = useExerciseMutations();

  const { muscles, difficulties } = useExerciseQueries();

  const { data: session } = useSession();
  const { toast } = useToast();

  const [isFormLoading, setIsFormLoading] = useState(false);

  const form = useForm<ExerciseFormSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: rowData ?? {},
  });

  useEffect(() => {
    const { isSubmitSuccessful: isSubmitSuccess } = form.formState;
    const isMutationSuccess =
      (isCreateExerciseSuccess || isUpdateExerciseSuccess) && isSubmitSuccess;

    if (isMutationSuccess) {
      setIsFormLoading(false);
      toast(TOAST_MESSAGES[type]);
      form.reset();
      onComplete();
    }
  }, [form, isCreateExerciseSuccess, isUpdateExerciseSuccess, onComplete, toast, type]);

  useEffect(() => {
    const isMutationLoading = isCreateExerciseLoading || isUpdateExerciseLoading;

    if (isMutationLoading) {
      setIsFormLoading(true);
    }
  }, [isCreateExerciseLoading, isUpdateExerciseLoading]);

  useEffect(() => {
    if (isCreateExerciseError) {
      toast(TOAST_MESSAGES.createError);
    }

    if (isUpdateExerciseError) {
      toast(TOAST_MESSAGES.updateError);
    }

    setIsFormLoading(false);
  }, [isCreateExerciseError, isUpdateExerciseError, toast]);

  const onSubmit = async (data: ExerciseFormSchema) => {
    if (!session) {
      redirect(AppRoutes.LOGIN);
    }

    const { user } = session;

    if (type === "create") {
      createExercise({
        ...data,
        userId: user.id,
      });
    }

    if (type === "update") {
      updateExercise({
        id: rowData.id,
        exercise: {
          ...data,
          userId: user.id,
        },
      });
    }
  };

  return {
    form,
    isFormLoading,
    onSubmit,
    muscles,
    difficulties,
  };
};
