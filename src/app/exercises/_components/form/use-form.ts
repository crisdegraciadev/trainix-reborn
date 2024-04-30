import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExerciseFormSchema, exerciseSchema } from "./exercise-schema";
import { TOAST_MESSAGES } from "./toast-messages";
import { ExerciseRow } from "@typings/entities/exercise";
import { redirect } from "next/navigation";
import { AppRoutes } from "@constants/routes";
import { useCreateExercise } from "@hooks/exercises/use-create-exercise";
import { useUpdateExercise } from "@hooks/exercises/use-update-exercise";
import { useFindDifficultiesOptions } from "@hooks/difficulties/use-find-difficulties-options";
import { useFindMusclesOptions } from "@hooks/muscles/use-find-muscles-options";

type BaseProps = {
  onComplete: () => void;
};

export type ExerciseFormProps = BaseProps &
  ({ type: "create"; rowData?: null } | { type: "update"; rowData: ExerciseRow });

const DEFAULT_FORM_VALUES = {};

export const useExerciseForm = ({ type, rowData, onComplete }: ExerciseFormProps) => {
  const { data: session } = useSession();

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const { data: muscles } = useFindMusclesOptions();

  const { data: difficulties } = useFindDifficultiesOptions();

  const {
    isSuccess: isCreateExerciseSuccess,
    isLoading: isCreateExerciseLoading,
    isError: isCreateExerciseError,
    mutate: createExercise,
  } = useCreateExercise();

  const {
    isSuccess: isUpdateExerciseSuccess,
    isLoading: isUpdateExerciseLoading,
    isError: isUpdateExerciseError,
    mutate: updateExercise,
  } = useUpdateExercise();

  const { toast } = useToast();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const form = useForm<ExerciseFormSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: rowData ?? DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    const { isSubmitSuccessful: isSubmitSuccess } = form.formState;

    if ((isCreateExerciseSuccess || isUpdateExerciseSuccess) && isSubmitSuccess) {
      setIsFormSubmitting(false);
      toast(TOAST_MESSAGES[type]);
      form.reset();
      onComplete();
    }
  }, [form, isCreateExerciseSuccess, isUpdateExerciseSuccess, onComplete, toast, type]);

  useEffect(() => {
    if (isCreateExerciseLoading || isUpdateExerciseLoading) {
      setIsFormSubmitting(true);
    }
  }, [isCreateExerciseLoading, isUpdateExerciseLoading]);

  useEffect(() => {
    if (isCreateExerciseError) {
      toast(TOAST_MESSAGES.createError);
    }

    if (isUpdateExerciseError) {
      toast(TOAST_MESSAGES.updateError);
    }

    setIsFormSubmitting(false);
  }, [isCreateExerciseError, isUpdateExerciseError, toast]);

  const onSubmit = async (data: ExerciseFormSchema) => {
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
    isFormSubmitting,
    onSubmit,
    muscles,
    difficulties,
  };
};
