import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExerciseFormSchema, createExerciseSchema } from "./create-exercise-schema";
import { useFindMusclesOptions } from "./use-find-muscles-options";
import { useSession } from "next-auth/react";
import { useCreateExercise } from "./use-create-exercise";

export const useCreateExerciseForm = () => {
  const { isFormLoading, isFormOpen, createExercise, toggleForm } = useCreateExercise();
  const { muscles } = useFindMusclesOptions();
  const { data: session } = useSession();

  const form = useForm<CreateExerciseFormSchema>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (data: CreateExerciseFormSchema) => {
    const { user } = session!;
    createExercise({ ...data, userId: user.id });
  };

  return { form, muscles, isFormLoading, isFormOpen, toggleForm, onSubmit };
};
