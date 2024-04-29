import { useToast } from "@components/ui/use-toast";
import { AppRoutes } from "@constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFindDifficultiesOptions } from "@hooks/difficulties/use-find-difficulties-options";
import { useFindMusclesOptions } from "@hooks/muscles/use-find-muscles-options";
import { useCreateWorkout } from "@hooks/workouts/use-create-workout";
import { useFindExerciseSelectList } from "app/workouts/_hooks/use-find-exercise-select-list";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TOAST_MESSAGES } from "./toast-messages";
import { WorkoutFormSchema, workoutSchema } from "./workout-schema";

export type WorkoutFormProps = {
  onComplete: () => void;
};

const DEFAULT_FORM_VALUES = {
  name: "",
  muscles: [],
  difficulty: "medium",
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
    createWorkout({ ...data, userId });
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
