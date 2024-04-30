import { toast } from "@components/ui/use-toast";
import { AppRoutes } from "@constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProgression } from "@hooks/progression/use-create-progression";
import { ActivityFormSchema } from "@typings/schemas/activity";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useFindExerciseSelectList } from "../../../../_hooks/use-find-exercise-select-list";
import { useWorkoutProgressionContext } from "../progression-context";
import { TOAST_MESSAGES } from "../toast-messages";
import { FirstProgressionFormSchema, firstProgressionSchema } from "./first-progression-schema";

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

  const form = useForm<FirstProgressionFormSchema>({
    resolver: zodResolver(firstProgressionSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const [isFormLoading, setIsFormLoading] = useState(false);

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

  const { data: exercises, isLoading: isExercisesLoading } = useFindExerciseSelectList({ userId });

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

      setProgressionTimeData((state) => ({
        ...state,
        selectedDate: new Date(form.getValues("date").toDateString()),
      }));

      form.reset();

      setIsCreateDialogOpen(false);
    }
  }, [form, isCreateProgressionSuccess, setIsCreateDialogOpen, setProgressionTimeData]);

  const onSubmit = async (data: FirstProgressionFormSchema) => {
    const { date, activities } = data;

    console.log("Creating first progression");
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
    exercises,
    isExercisesLoading,
    activityFields,
    isFormLoading,
    onSubmit,
    appendActivity,
    removeActivity,
  };
};
