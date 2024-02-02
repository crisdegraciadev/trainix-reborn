import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormSchema, loginFormSchema } from "./LoginFormSchema";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { HttpStatus } from "../../constants/http";

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: LoginFormSchema) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.status === HttpStatus.UNAUTHORIZED) {
      return toast({
        variant: "destructive",
        title: "Incorrect credentials.",
        description: "The provided credentials are not correct.",
      });
    }

    router.push("/dashboard");
    router.refresh();
  };

  return { form, isLoading, onSubmit };
};
