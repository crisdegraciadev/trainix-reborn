import { toast } from "@components/ui/use-toast";
import { AppRoutes } from "@constants/routes";
import { useCreateProgression } from "@hooks/progression/use-create-progression";
import { useFindExerciseSelectList } from "../../../../_hooks/use-find-exercise-select-list";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TOAST_MESSAGES } from "../toast-messages";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirstProgressionFormSchema, firstProgressionSchema } from "./first-progression-schema";
import { SelectOption } from "@components/ui/multi-select";
import { ActivityFormSchema } from "@typings/schemas/activity";
import { useWorkoutProgressionContext } from "../progression-context";

const DEFAULT_FORM_VALUES = {
  date: new Date(),
  activities: [],
};

export const useFirstProgressionForm = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const { currentWorkout, setIsCreateDialogOpen, setProgressionTimeData } =
    useWorkoutProgressionContext();

  const userId = useMemo(() => session.user.id, [session]);
  const workoutId = useMemo(() => currentWorkout?.id ?? "", [currentWorkout]);

  const {
    mutate: createProgression,
    isSuccess: isCreateProgressionSuccess,
    isLoading: isCreateProgressionLoading,
    isError: isCreateProgressionError,
  } = useCreateProgression();

  useEffect(() => {
    if (isCreateProgressionLoading) {
      setIsFormLoading(true);
    }
  }, [isCreateProgressionLoading]);

  useEffect(() => {
    if (isCreateProgressionError) {
      toast(TOAST_MESSAGES.createError);
    }
    setIsFormLoading(false);
  }, [isCreateProgressionError]);

  const {
    data: exercises,
    isSuccess: isExercisesSuccess,
    isError: isExercisesError,
  } = useFindExerciseSelectList({ userId });

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

  const form = useForm<FirstProgressionFormSchema>({
    resolver: zodResolver(firstProgressionSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [exercisesOptions, setExercisesOptions] = useState<SelectOption[]>([]);

  const {
    fields: activityFields,
    append: appendActivityField,
    remove: removeActivityField,
  } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  useEffect(() => {
    if (isCreateProgressionSuccess && form.formState.isSubmitSuccessful) {
      setIsFormLoading(false);
      toast(TOAST_MESSAGES.create);

      setProgressionTimeData((state) => ({ ...state, selectedDate: form.getValues("date") }));

      form.reset();

      setIsCreateDialogOpen(false);
    }
  }, [form, isCreateProgressionSuccess, setIsCreateDialogOpen, setProgressionTimeData]);

  const onSubmit = async (data: FirstProgressionFormSchema) => {
    const { date, activities } = data;

    console.log("Creating workout");
    console.log({ workoutData: { date: new Date(date.toDateString()) } });

    if (!workoutId) {
      throw new Error("Field workoutId is not provided");
    }

    createProgression({
      workoutId,
      progression: {
        date: new Date(date.toDateString()),
        activities,
      },
    });
  };

  const appendActivity = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    appendActivityField({ order: activityFields.length } as ActivityFormSchema);
  };

  const removeActivity = (e: React.MouseEvent<Element, MouseEvent>, idx: number) => {
    e.preventDefault();
    removeActivityField(idx);
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
