import { SelectOption } from "@components/ui/multi-select";
import { AppRoutes } from "@constants/routes";
import { useFindExerciseSelectList } from "app/workouts/_hooks/use-find-exercise-select-list";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ProgressionFormSchema, progressionSchema } from "./progression-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityFormSchema } from "@typings/schemas/activity";
import { useCreateProgression } from "@hooks/progression/use-create-progression";
import { TOAST_MESSAGES } from "./toast-messages";
import { toast } from "@components/ui/use-toast";
import { useWorkoutProgressionContext } from "../workout-progression-context";

const DEFAULT_FORM_VALUES = {
  date: new Date(),
  activities: [{ order: 0 }, { order: 1 }, { order: 2 }, { order: 3 }],
};

export const useProgressionForm = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const { currentWorkout, setIsCreateDialogOpen } = useWorkoutProgressionContext();

  const userId = useMemo(() => session.user.id, [session]);
  const workoutId = useMemo(() => currentWorkout?.id, [currentWorkout]);

  const {
    mutate: createProgression,
    isSuccess: isCreateProgressionSuccess,
    isLoading: isCreateProgressionLoading,
    isError: isCreateProgressionError,
  } = useCreateProgression();

  const {
    data: exercises,
    isSuccess: isExercisesSuccess,
    isError: isExercisesError,
  } = useFindExerciseSelectList({ userId });

  const [isFormLoading, setIsFormLoading] = useState(false);

  const [exercisesOptions, setExercisesOptions] = useState<SelectOption[]>([]);

  const form = useForm<ProgressionFormSchema>({
    resolver: zodResolver(progressionSchema),
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
    if (isCreateProgressionSuccess && form.formState.isSubmitSuccessful) {
      setIsFormLoading(false);
      toast(TOAST_MESSAGES.create);
      form.reset();
      setIsCreateDialogOpen(false);
    }
  }, [form, isCreateProgressionSuccess, setIsCreateDialogOpen]);

  useEffect(() => {
    if (isCreateProgressionLoading) {
      setIsFormLoading(true);
    }
  }, [isCreateProgressionLoading]);

  useEffect(() => {
    if (isCreateProgressionError) toast(TOAST_MESSAGES.createError);
    setIsFormLoading(false);
  }, [isCreateProgressionError]);

  useEffect(() => {
    if (isExercisesSuccess && exercises) {
      setExercisesOptions(exercises);
    }
  }, [isExercisesSuccess, exercises]);

  useEffect(() => {
    if (isExercisesError) {
      setExercisesOptions([]);
    }
  }, [isExercisesError]);

  const onSubmit = async (data: ProgressionFormSchema) => {
    const { date, activities } = data;

    if (!workoutId) {
      throw new Error("Field workoutId is not provided");
    }

    createProgression({
      workoutId,
      progression: {
        date: String(date),
        activities,
      },
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
    exercisesOptions,
    activityFields,
    isFormLoading,
    onSubmit,
    appendActivity,
    removeActivity,
  };
};
