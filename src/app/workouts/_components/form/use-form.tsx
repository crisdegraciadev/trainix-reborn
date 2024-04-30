import { useToast } from "@components/ui/use-toast";
import { AppRoutes } from "@constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFindDifficultiesOptions } from "@hooks/difficulties/use-find-difficulties-options";
import { useFindMusclesOptions } from "@hooks/muscles/use-find-muscles-options";
import { useCreateWorkout } from "@hooks/workouts/use-create-workout";
import { useFindExerciseSelectList } from "app/workouts/_hooks/use-find-exercise-select-list";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TOAST_MESSAGES } from "./toast-messages";
import { WorkoutFormSchema, workoutSchema } from "./workout-schema";
import { WorkoutRow } from "@typings/entities/workout";
import { useUpdateWorkout } from "@hooks/workouts/use-update-workout";

export type BaseProps = {
  onComplete: () => void;
};

export type WorkoutFormProps = BaseProps &
  ({ type: "create"; rowData?: null } | { type: "update"; rowData: WorkoutRow });

const DEFAULT_FORM_VALUES = {
  name: "",
  muscles: [],
  difficulty: "medium",
};

export const useWorkoutForm = ({ onComplete, rowData, type }: WorkoutFormProps) => {
  const { data: session } = useSession();

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const userId = session.user.id;

  const {
    isSuccess: isCreateWorkoutSuccess,
    isLoading: isCreateWorkoutLoading,
    isError: isCreateWorkoutError,
    mutate: createWorkout,
  } = useCreateWorkout();

  const {
    isSuccess: isUpdateWorkoutSuccess,
    isLoading: isUpdateWorkoutLoading,
    isError: isUpdateWorkoutError,
    mutate: updateWorkout,
  } = useUpdateWorkout();

  const { data: difficulties } = useFindDifficultiesOptions();
  const { data: muscles } = useFindMusclesOptions();
  const { data: exercises } = useFindExerciseSelectList({ userId });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { toast } = useToast();

  const defaultFormValues = useMemo(() => {
    if (rowData) {
      const { description } = rowData;
      return { ...rowData, description: description ?? "" };
    }

    return DEFAULT_FORM_VALUES;
  }, [rowData]);

  const form = useForm<WorkoutFormSchema>({
    resolver: zodResolver(workoutSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    const { isSubmitSuccessful: isSubmitSuccess } = form.formState;

    if ((isCreateWorkoutSuccess || isUpdateWorkoutSuccess) && isSubmitSuccess) {
      setIsFormSubmitting(false);
      toast(TOAST_MESSAGES[type]);
      form.reset();
      onComplete();
    }
  }, [form, isCreateWorkoutSuccess, isUpdateWorkoutSuccess, type, onComplete, toast]);

  useEffect(() => {
    if (isCreateWorkoutLoading || isUpdateWorkoutLoading) {
      setIsFormSubmitting(true);
    }
  }, [isCreateWorkoutLoading, isUpdateWorkoutLoading]);

  useEffect(() => {
    if (isCreateWorkoutError) {
      toast(TOAST_MESSAGES.createError);
    }

    if (isUpdateWorkoutError) {
      toast(TOAST_MESSAGES.updateError);
    }

    setIsFormSubmitting(false);
  }, [isCreateWorkoutError, isUpdateWorkoutError, toast]);

  const onSubmit = async (data: WorkoutFormSchema) => {
    const workout = { ...data, userId };

    if (type === "create") {
      createWorkout({ ...workout });
    }

    if (type === "update") {
      updateWorkout({ workout, id: rowData.id });
    }
  };

  return {
    form,
    onSubmit,
    muscles,
    difficulties,
    exercises,
    isFormSubmitting,
  };
};
