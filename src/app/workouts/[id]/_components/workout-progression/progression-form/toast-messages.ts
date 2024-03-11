import { ToastMessage } from "@components/ui/use-toast";

export const TOAST_MESSAGES: Record<string, ToastMessage> = {
  create: {
    variant: "default",
    title: "Progression created.",
    description: "The progression has been added to the workout.",
  },
  createError: {
    variant: "destructive",
    title: "Error creating progression.",
    description: "There was an unexpected error creating the progression.",
  },
} as const;
