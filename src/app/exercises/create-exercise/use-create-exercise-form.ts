import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExerciseFormSchema, createExerciseSchema } from "./create-exercise-schema";
import { useFindMusclesOptions } from "./use-find-muscles-options";
import { useSession } from "next-auth/react";
import { useCreateExercise } from "./use-create-exercise";
import { useFindDifficultiesOptions } from "./use-find-difficulties-options";

export const useCreateExerciseForm = () => {
  const { isFormLoading, isFormOpen, createExercise, toggleForm } = useCreateExercise();
  const { muscles } = useFindMusclesOptions();
  const { difficulties } = useFindDifficultiesOptions();
  const { data: session } = useSession();

  const form = useForm<CreateExerciseFormSchema>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: { name: "", description: "", muscles: [], difficulty: "medium" },
  });

  const onSubmit = async (data: CreateExerciseFormSchema) => {
    const { user } = session!;

    const difficultyId = getDifficultyId(data);

    createExercise({
      ...data,
      difficultyId,
      userId: user.id,
    });
  };

  const getDifficultyId = ({ difficulty }: CreateExerciseFormSchema) => {
    const idx = difficulties.findIndex(({ value }) => value === difficulty)!;
    return difficulties[idx].id!;
  };

  return { form, muscles, difficulties, isFormLoading, isFormOpen, toggleForm, onSubmit };
};
