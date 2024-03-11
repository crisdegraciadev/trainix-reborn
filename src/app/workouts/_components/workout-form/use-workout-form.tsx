import { SelectOption } from "@components/ui/multi-select";
import { useToast } from "@components/ui/use-toast";
import { useFindMusclesSelectList } from "@hooks/muscles/use-find-muscles-options";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { WorkoutTableData } from "../workout-table/workout-columns";
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

export type WorkoutFormProps =
  | {
      type: "create";
      rowData?: null;
      onComplete: () => void;
    }
  | {
      type: "update";
      rowData: WorkoutRow;
      onComplete: () => void;
    };

const rowToFormValues = ({ difficulty: { value }, ...rest }: WorkoutRow) => ({
  ...rest,
  difficulty: value,
});

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

  const userId = useMemo(() => session.user.id, [session]);

  const { isCreateWorkoutSuccess, isCreateWorkoutLoading, isCreateWorkoutError, createWorkout } =
    useCreateWorkout();

  const { isUpdateWorkoutSuccess, isUpdateWorkoutLoading, isUpdateWorkoutError, updateWorkout } =
    useUpdateWorkout();

  const {
    data: difficulties,
    isSuccess: isDifficultiesSuccess,
    isError: isDifficultiesError,
  } = useFindDifficulties();

  const {
    data: muscles,
    isSuccess: isMusclesSuccess,
    isError: isMusclesError,
  } = useFindMusclesSelectList();

  const {
    data: exercises,
    isSuccess: isExercisesSuccess,
    isError: isExercisesError,
  } = useFindExerciseSelectList({ userId });

  const [isFormLoading, setIsFormLoading] = useState(false);

  const [difficultiesOptions, setDifficultiesOptions] = useState<SelectOption[]>([]);
  const [musclesOptions, setMusclesOptions] = useState<SelectOption[]>([]);
  const [exercisesOptions, setExercisesOptions] = useState<SelectOption[]>([]);

  const { toast } = useToast();

  const form = useForm<WorkoutFormSchema>({
    resolver: zodResolver(workoutSchema),
    defaultValues: rowData ? rowToFormValues(rowData) : DEFAULT_FORM_VALUES,
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
    if ((isCreateWorkoutSuccess || isUpdateWorkoutSuccess) && form.formState.isSubmitSuccessful) {
      setIsFormLoading(false);
      toast(TOAST_MESSAGES[type]);
      form.reset();
      onComplete();
    }
  }, [form, isCreateWorkoutSuccess, isUpdateWorkoutSuccess, onComplete, toast, type]);

  useEffect(() => {
    if (isCreateWorkoutLoading || isUpdateWorkoutLoading) {
      setIsFormLoading(true);
    }
  }, [isCreateWorkoutLoading, isUpdateWorkoutLoading]);

  useEffect(() => {
    if (isCreateWorkoutError) toast(TOAST_MESSAGES.createError);
    if (isUpdateWorkoutError) toast(TOAST_MESSAGES.updateError);
    setIsFormLoading(false);
  }, [isCreateWorkoutError, isUpdateWorkoutError, toast]);

  useEffect(() => {
    if (isDifficultiesSuccess && difficulties) {
      setDifficultiesOptions(difficulties);
    }
  }, [isDifficultiesSuccess, difficulties]);

  useEffect(() => {
    if (isDifficultiesError) {
      setDifficultiesOptions([]);
    }
  }, [isDifficultiesError]);

  useEffect(() => {
    if (isMusclesSuccess && muscles) {
      setMusclesOptions(muscles);
    }
  }, [isMusclesSuccess, muscles]);

  useEffect(() => {
    if (isMusclesError) {
      setMusclesOptions([]);
    }
  }, [isMusclesError]);

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
    musclesOptions,
    difficultiesOptions,
    exercisesOptions,
    isFormLoading,
    onSubmit,
  };
};
