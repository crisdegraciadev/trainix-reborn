import { SelectOption } from "@components/ui/multi-select";
import { AppRoutes } from "@constants/routes";
import { useFindExerciseSelectList } from "app/workouts/_hooks/use-find-exercise-select-list";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImprovementSchema, ProgressionFormSchema, progressionSchema } from "./progression-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityFormSchema } from "@typings/schemas/activity";
import { useCreateProgression } from "@hooks/progression/use-create-progression";
import { TOAST_MESSAGES } from "./toast-messages";
import { toast } from "@components/ui/use-toast";
import { useWorkoutProgressionContext } from "../workout-progression-context";

const DEFAULT_FORM_VALUES = {
  date: new Date(),
  activities: [],
  improvements: [],
};

export const useProgressionForm = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const { currentWorkout, currentProgression, setIsCreateDialogOpen } =
    useWorkoutProgressionContext();

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

  const activitiesControl = form.getFieldState("activities");

  console.log({ activitiesControl });

  const {
    fields: activityFields,
    append: appendActivityField,
    remove: removeActivityField,
  } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  const {
    fields: improvementFields,
    append: appendImprovementField,
    remove: removeImprovementField,
  } = useFieldArray({
    control: form.control,
    name: "improvements",
  });

  useEffect(() => {
    const improvementsValue = form.getValues("improvements");

    if (currentProgression && improvementsValue.length < currentProgression.activities.length) {
      currentProgression?.activities.forEach(({ name, exerciseId }) => {
        appendImprovementField({ name, exerciseId, improve: "=" });
      });
    }
  }, [currentProgression, improvementFields, form, appendImprovementField]);

  useEffect(() => {
    const activitiesValue = form.getValues("activities");

    if (currentProgression && activitiesValue.length < currentProgression.activities.length) {
      currentProgression?.activities.forEach(({ exerciseId, sets, reps, order }) => {
        appendActivityField({ exerciseId, sets, reps, order });
      });
    }
  }, [currentProgression, activityFields, form, appendActivityField]);

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

    console.log({ data });

    if (!workoutId) {
      throw new Error("Field workoutId is not provided");
    }

    createProgression({
      workoutId,
      progression: {
        date,
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
    improvementFields,
    isFormLoading,
    currentProgression,
    onSubmit,
    appendActivity,
    removeActivity,
  };
};
