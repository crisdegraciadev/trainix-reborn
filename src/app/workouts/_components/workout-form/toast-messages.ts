import { ToastMessage } from "@components/ui/use-toast";

export const TOAST_MESSAGES: Record<string, ToastMessage> = {
  create: {
    variant: "default",
    title: "Exercise created.",
    description: "The exercise has been created.",
  },
  update: {
    variant: "default",
    title: "Exercise updated.",
    description: "The exercise has been updated.",
  },
  createError: {
    variant: "destructive",
    title: "Error creating exercise.",
    description: "There was an unexpected error creating the exericse.",
  },
  updateError: {
    variant: "destructive",
    title: "Error updating exercise.",
    description: "There was an unexpected error updating the exericse.",
  },
} as const;
