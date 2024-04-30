import { toast } from "@components/ui/use-toast";
import { AppRoutes } from "@constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProgression } from "@hooks/progression/use-create-progression";
import { useFindLastProgression } from "@hooks/progression/use-find-last-progression";
import { ActivityFormSchema } from "@typings/schemas/activity";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useFindExerciseSelectList } from "../../../../_hooks/use-find-exercise-select-list";
import { useWorkoutProgressionContext } from "../progression-context";
import { TOAST_MESSAGES } from "../toast-messages";
import { NextProgressionFormSchema, nextProgressionSchema } from "./next-progression-schema";

const DEFAULT_FORM_VALUES = {
  date: new Date(),
  activities: [],
  improvements: [],
};

export const useNextProgressionForm = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const { currentWorkout, currentProgression, setIsCreateDialogOpen, setProgressionTimeData } =
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

  const { data: exercises, isLoading: isExercisesLoading } = useFindExerciseSelectList({ userId });
  const { data: lastProgression } = useFindLastProgression({ workoutId });

  const form = useForm<NextProgressionFormSchema>({
    resolver: zodResolver(nextProgressionSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isActivityFieldSetup, setIsActivityFieldSetup] = useState(false);

  const {
    fields: activityFields,
    append: appendActivityField,
    remove: removeActivityField,
  } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  const { fields: improvementFields, append: appendImprovementField } = useFieldArray({
    control: form.control,
    name: "improvements",
  });

  useEffect(() => {
    if (lastProgression) {
      const today = new Date();
      const { createdAt } = lastProgression;

      form.setValue("date", today > createdAt ? today : createdAt);
    }
  }, [lastProgression, form]);

  // Append improvements fields dinamically on mount
  useEffect(() => {
    const improvementsValue = form.getValues("improvements");

    if (lastProgression && improvementsValue.length < lastProgression.activities.length) {
      lastProgression?.activities.forEach(({ id, name, exerciseId, sets, reps }) => {
        appendImprovementField({ name, exerciseId, activityId: id, sets, reps, improve: "=" });
      });
    }
  }, [lastProgression, improvementFields, form, appendImprovementField]);

  // Append activity fields dinamically on mount
  useEffect(() => {
    const activitiesValue = form.getValues("activities");

    if (
      lastProgression &&
      activitiesValue.length < lastProgression.activities.length &&
      !isActivityFieldSetup
    ) {
      lastProgression?.activities.forEach(({ exerciseId, sets, reps, order }) => {
        appendActivityField({ exerciseId, sets, reps, order });
      });

      setIsActivityFieldSetup(true);
    }
  }, [lastProgression, activityFields, form, appendActivityField, isActivityFieldSetup]);

  useEffect(() => {
    if (isCreateProgressionSuccess && form.formState.isSubmitSuccessful) {
      setIsFormLoading(false);
      toast(TOAST_MESSAGES.create);

      // setProgressionTimeData((state) => ({ ...state, selectedDate: form.getValues("date") }));

      form.reset();

      setIsCreateDialogOpen(false);
    }
  }, [form, isCreateProgressionSuccess, setIsCreateDialogOpen, setProgressionTimeData]);

  const onSubmit = async (data: NextProgressionFormSchema) => {
    const { date, activities, improvements } = data;

    console.log("Creating workout");
    console.log({ workoutData: { date } });

    if (!workoutId) {
      throw new Error("Field workoutId is not provided");
    }

    createProgression({
      workoutId,
      improvements,
      currentProgressionId: currentProgression?.id,
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
    improvementFields,
    isFormLoading,
    lastProgression,
    currentProgression,
    onSubmit,
    appendActivity,
    removeActivity,
  };
};
