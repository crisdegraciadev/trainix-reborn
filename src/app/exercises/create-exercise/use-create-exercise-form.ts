import { useState } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExerciseFormSchema,
  createExerciseSchema,
} from "./create-exercise-schema";
import { trpc } from "../../../trpc/client";

export const useCreateExerciseForm = () => {
  const { mutate: createExercise } = trpc.createExercise.useMutation();

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateExerciseFormSchema>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (data: CreateExerciseFormSchema) => {
    setIsLoading(true);

    createExercise(data);

    setIsLoading(false);
  };

  return { form, isLoading, onSubmit };
};
