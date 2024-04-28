import { useToast } from "@components/ui/use-toast";
import { useFindMusclesOptions } from "@hooks/muscles/use-find-muscles-options";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFindDifficultiesOptions } from "@hooks/difficulties/use-find-difficulties-options";
import { WorkoutFormSchema, workoutSchema } from "./workout-schema";
import { useCreateWorkout } from "@hooks/workouts/use-create-workout";
import { TOAST_MESSAGES } from "./toast-messages";
import { useFindExerciseSelectList } from "app/workouts/_hooks/use-find-exercise-select-list";
import { redirect } from "next/navigation";
import { AppRoutes } from "@constants/routes";
import { ActivityFormSchema } from "@typings/schemas/activity";

export type WorkoutFormProps = {
  onComplete: () => void;
};

const DEFAULT_FORM_VALUES = {
  name: "",
  muscles: [],
  difficulty: "medium",
  activities: [{ order: 0 }, { order: 1 }, { order: 2 }, { order: 3 }],
};

export const useWorkoutForm = ({ onComplete }: WorkoutFormProps) => {
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

  const { data: difficulties } = useFindDifficultiesOptions();
  const { data: muscles } = useFindMusclesOptions();
  const { data: exercises } = useFindExerciseSelectList({ userId });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<WorkoutFormSchema>({
    resolver: zodResolver(workoutSchema),
    defaultValues: DEFAULT_FORM_VALUES,
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

    if (isCreateWorkoutSuccess && isSubmitSuccess) {
      setIsFormSubmitting(false);
      toast(TOAST_MESSAGES.create);
      form.reset();
      onComplete();
    }
  }, [form, isCreateWorkoutSuccess, onComplete, toast]);

  useEffect(() => {
    if (isCreateWorkoutLoading) {
      setIsFormSubmitting(true);
    }
  }, [isCreateWorkoutLoading]);

  useEffect(() => {
    if (isCreateWorkoutError) {
      toast(TOAST_MESSAGES.createError);
    }

    setIsFormSubmitting(false);
  }, [isCreateWorkoutError, toast]);

  const onSubmit = async (data: WorkoutFormSchema) => {
    createWorkout({
      ...data,
      userId,
      date: new Date(),
    });
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
