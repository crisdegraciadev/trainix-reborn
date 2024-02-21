import { SelectOption } from "@components/ui/multi-select";
import { useToast } from "@components/ui/use-toast";
import { useFindMuscles } from "@hooks/muscles/use-find-muscles-options";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { WorkoutTableData } from "../workout-table/workout-columns";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFindDifficulties } from "@hooks/difficulties/use-find-difficulties-options";
import { WorkoutFormSchema, workoutSchema } from "./workout-schema";
import { useCreateWorkout } from "@hooks/workouts/use-create-workout";
import { useUpdateWorkout } from "@hooks/workouts/use-update-workout";
import { TOAST_MESSAGES } from "./toast-messages";

export type WorkoutFormProps =
  | {
      type: "create";
      rowData?: null;
      onComplete: () => void;
    }
  | {
      type: "update";
      rowData: WorkoutTableData;
      onComplete: () => void;
    };

const rowToFormValues = ({ difficulty: { value }, ...rest }: WorkoutTableData) => ({
  ...rest,
  difficulty: value,
});

const DEFAULT_FORM_VALUES = {
  name: "",
  muscles: [],
  difficulty: "medium",
  activities: [
    { exerciseId: -1, sets: 0, reps: 0 },
    { exerciseId: -1, sets: 0, reps: 0 },
    { exerciseId: -1, sets: 0, reps: 0 },
    { exerciseId: -1, sets: 0, reps: 0 },
  ],
};

export const useWorkoutForm = ({ type, rowData, onComplete }: WorkoutFormProps) => {
  const { isCreateWorkoutSuccess, isCreateWorkoutLoading, isCreateWorkoutError, createWorkout } = useCreateWorkout();

  const { isUpdateWorkoutSuccess, isUpdateWorkoutLoading, isUpdateWorkoutError, updateWorkout } = useUpdateWorkout();

  const { muscles, isMuscleSuccess, isMuscleError } = useFindMuscles();
  const { difficulties, isDifficultiesSuccess, isDifficultiesError } = useFindDifficulties();
  const { data: session } = useSession();

  const [isFormLoading, setIsFormLoading] = useState(false);

  const [difficultiesOptions, setDifficultiesOptions] = useState<SelectOption[]>([]);
  const [musclesOptions, setMusclesOptions] = useState<SelectOption[]>([]);

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
    if (isCreateWorkoutLoading || isUpdateWorkoutLoading) setIsFormLoading(true);
  }, [isCreateWorkoutLoading, isUpdateWorkoutLoading]);

  useEffect(() => {
    if (isCreateWorkoutError) toast(TOAST_MESSAGES.createError);
    if (isUpdateWorkoutError) toast(TOAST_MESSAGES.updateError);
    setIsFormLoading(false);
  }, [isCreateWorkoutError, isUpdateWorkoutError, toast]);

  useEffect(() => {
    if (isDifficultiesSuccess) {
      setDifficultiesOptions(
        difficulties
          .toSorted((a, b) => b.level - a.level)
          .toReversed()
          .map(({ level, ...rest }) => ({ ...rest }))
      );
    }
  }, [isDifficultiesSuccess, difficulties]);

  useEffect(() => {
    if (isDifficultiesError) setDifficultiesOptions([]);
  }, [isDifficultiesError]);

  useEffect(() => {
    if (isMuscleSuccess) {
      setMusclesOptions(muscles.map(({ createdAt, updatedAt, ...rest }) => ({ ...rest })));
    }
  }, [isMuscleSuccess, muscles]);

  useEffect(() => {
    if (isMuscleError) {
      setMusclesOptions([]);
    }
  }, [isMuscleError]);

  const onSubmit = async (data: WorkoutFormSchema) => {
    const { user } = session!;

    console.log({ data });

    const difficultyId = getDifficultyId(data);

    if (type === "create") {
      createWorkout({
        ...data,
        difficultyId,
        userId: user.id,
      });
    }

    if (type === "update") {
      updateWorkout({
        id: rowData.id,
        workout: {
          ...data,
          difficultyId,
          userId: user.id,
        },
      });
    }
  };

  const appendActivity = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    append({ exerciseId: -1, sets: 0, reps: 0 });
  };

  const removeActivity = (e: React.MouseEvent<Element, MouseEvent>, idx: number) => {
    e.preventDefault();
    remove(idx);
  };

  const getDifficultyId = ({ difficulty }: WorkoutFormSchema) => {
    const idx = difficulties.findIndex(({ value }) => value === difficulty)!;
    return difficulties[idx].id!;
  };

  return {
    form,
    activityFields,
    appendActivity,
    removeActivity,
    musclesOptions,
    difficultiesOptions,
    isFormLoading,
    onSubmit,
  };
};
