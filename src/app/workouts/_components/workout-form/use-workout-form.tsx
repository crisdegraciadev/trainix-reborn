import { useToast } from "@components/ui/use-toast";
import { useFindMusclesSelectList } from "@hooks/muscles/use-find-muscles-options";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFindDifficulties } from "@hooks/difficulties/use-find-difficulties-options";
import { WorkoutFormSchema, workoutSchema } from "./workout-schema";
import { useCreateWorkout } from "@hooks/workouts/use-create-workout";
import { useUpdateWorkout } from "@hooks/workouts/use-update-workout";
import { TOAST_MESSAGES } from "./toast-messages";
import { useFindExerciseSelectList } from "app/workouts/_hooks/use-find-exercise-select-list";
import { redirect } from "next/navigation";
import { AppRoutes } from "@constants/routes";
import { ActivityFormSchema } from "@typings/schemas/activity";
import { WorkoutRow } from "@typings/entities/workout";

type BaseProps = {
  onComplete: () => void;
};

export type WorkoutFormProps = BaseProps &
  ({ type: "create"; rowData?: null } | { type: "update"; rowData: WorkoutRow });

const DEFAULT_FORM_VALUES = {
  name: "",
  muscles: [],
  difficulty: "medium",
  activities: [{ order: 0 }, { order: 1 }, { order: 2 }, { order: 3 }],
};

export const useWorkoutForm = ({ type, rowData, onComplete }: WorkoutFormProps) => {
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

  const { data: difficulties } = useFindDifficulties();
  const { data: muscles } = useFindMusclesSelectList();
  const { data: exercises } = useFindExerciseSelectList({ userId });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<WorkoutFormSchema>({
    resolver: zodResolver(workoutSchema),
    defaultValues: rowData ?? DEFAULT_FORM_VALUES,
  });

  const {
    fields: activityFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  useEffect(() => {
    const { isSubmitSuccessful: isSubmitSuccess } = form.formState;

    if ((isCreateWorkoutSuccess || isUpdateWorkoutSuccess) && isSubmitSuccess) {
      setIsFormSubmitting(false);
      toast(TOAST_MESSAGES[type]);
      form.reset();
      onComplete();
    }
  }, [form, isCreateWorkoutSuccess, isUpdateWorkoutSuccess, onComplete, toast, type]);

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
    if (type === "create") {
      createWorkout({
        ...data,
        userId,
      });
    }

    if (type === "update") {
      updateWorkout({
        id: rowData.id,
        workout: {
          ...data,
          userId,
        },
      });
    }
  };

  const appendActivity = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    append({ order: activityFields.length } as ActivityFormSchema);
  };

  const removeActivity = (e: React.MouseEvent<Element, MouseEvent>, idx: number) => {
    e.preventDefault();
    remove(idx);
  };

  return {
    form,
    activityFields,
    appendActivity,
    removeActivity,
    onSubmit,
    muscles,
    difficulties,
    exercises,
    isFormSubmitting,
  };
};
