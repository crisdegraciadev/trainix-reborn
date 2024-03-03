import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateExercise } from "@hooks/exercises/use-create-exercise";
import { useFindMusclesSelectList } from "@hooks/muscles/use-find-muscles-options";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExerciseFormSchema, exerciseSchema } from "./exercise-schema";
import { useUpdateExercise } from "@hooks/exercises/use-update-exercise";
import { TOAST_MESSAGES } from "./toast-messages";
import { SelectOption } from "@components/ui/multi-select";
import { useFindDifficulties } from "@hooks/difficulties/use-find-difficulties-options";
import { ExerciseRow } from "@typings/entities/exercise";

export type ExerciseFormProps =
  | {
      type: "create";
      rowData?: null;
      onComplete: () => void;
    }
  | {
      type: "update";
      rowData: ExerciseRow;
      onComplete: () => void;
    };

const formatRowData = ({
  id,
  userId,
  difficulty: { value },
  difficultyId,
  ...rest
}: ExerciseRow) => ({
  ...rest,
  difficulty: value,
});

export const useExerciseForm = ({ type, rowData, onComplete }: ExerciseFormProps) => {
  const {
    isCreateExerciseSuccess,
    isCreateExerciseLoading,
    isCreateExerciseError,
    createExercise,
  } = useCreateExercise();

  const {
    isUpdateExerciseSuccess,
    isUpdateExerciseLoading,
    isUpdateExerciseError,
    updateExercise,
  } = useUpdateExercise();

  const {
    data: muscles,
    isSuccess: isMusclesSuccess,
    isError: isMusclesError,
  } = useFindMusclesSelectList();

  const {
    data: difficulties,
    isSuccess: isDifficultiesSuccess,
    isError: isDifficultiesError,
  } = useFindDifficulties();

  const { data: session } = useSession();

  const [isFormLoading, setIsFormLoading] = useState(false);

  const [difficultiesOptions, setDifficultiesOptions] = useState<SelectOption[]>([]);
  const [musclesOptions, setMusclesOptions] = useState<SelectOption[]>([]);

  const { toast } = useToast();

  const form = useForm<ExerciseFormSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: rowData
      ? formatRowData(rowData)
      : { name: "", muscles: [], difficulty: "medium" },
  });

  useEffect(() => {
    if ((isCreateExerciseSuccess || isUpdateExerciseSuccess) && form.formState.isSubmitSuccessful) {
      setIsFormLoading(false);
      toast(TOAST_MESSAGES[type]);
      form.reset();
      onComplete();
    }
  }, [form, isCreateExerciseSuccess, isUpdateExerciseSuccess, onComplete, toast, type]);

  useEffect(() => {
    if (isCreateExerciseLoading || isUpdateExerciseLoading) setIsFormLoading(true);
  }, [isCreateExerciseLoading, isUpdateExerciseLoading]);

  useEffect(() => {
    if (isCreateExerciseError) toast(TOAST_MESSAGES.createError);
    if (isUpdateExerciseError) toast(TOAST_MESSAGES.updateError);
    setIsFormLoading(false);
  }, [isCreateExerciseError, isUpdateExerciseError, toast]);

  useEffect(() => {
    if (isDifficultiesSuccess && difficulties) {
      setDifficultiesOptions(difficulties);
    }
  }, [isDifficultiesSuccess, difficulties]);

  useEffect(() => {
    if (isDifficultiesError) setDifficultiesOptions([]);
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

  const onSubmit = async (data: ExerciseFormSchema) => {
    const { user } = session!;

    const difficultyId = getDifficultyId(data);

    if (type === "create") {
      createExercise({
        ...data,
        difficultyId,
        userId: user.id,
      });
    }

    if (type === "update") {
      updateExercise({
        id: rowData.id,
        exercise: {
          ...data,
          difficultyId,
          userId: user.id,
        },
      });
    }
  };

  const getDifficultyId = ({ difficulty }: ExerciseFormSchema) => {
    if (difficulties) {
    }

    const idx = difficultiesOptions.findIndex(({ value }) => value === difficulty)!;
    return difficultiesOptions[idx].id!;
  };

  return {
    form,
    musclesOptions,
    difficultiesOptions,
    isFormLoading,
    onSubmit,
  };
};
