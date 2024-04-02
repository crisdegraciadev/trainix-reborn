import { ToastMessage } from "@components/ui/use-toast";

export const TOAST_MESSAGES: Record<string, ToastMessage> = {
  create: {
    variant: "default",
    title: "Exercise created.",
    description: "The exercise has been created.",
    duration: 3000,
  },
  update: {
    variant: "default",
    title: "Exercise updated.",
    description: "The exercise has been updated.",
    duration: 3000,
  },
  createError: {
    variant: "destructive",
    title: "Error creating exercise.",
    description: "There was an unexpected error creating the exericse.",
    duration: 3000,
  },
  updateError: {
    variant: "destructive",
    title: "Error updating exercise.",
    description: "There was an unexpected error updating the exericse.",
    duration: 3000,
  },
} as const;
