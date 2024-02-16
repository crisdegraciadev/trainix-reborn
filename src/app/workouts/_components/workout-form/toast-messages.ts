import { ToastMessage } from "@components/ui/use-toast";

export const TOAST_MESSAGES: Record<string, ToastMessage> = {
  create: {
    variant: "default",
    title: "Workout created.",
    description: "The workout has been created.",
  },
  update: {
    variant: "default",
    title: "Workout updated.",
    description: "The workout has been updated.",
  },
  createError: {
    variant: "destructive",
    title: "Error creating workout.",
    description: "There was an unexpected error creating the workout.",
  },
  updateError: {
    variant: "destructive",
    title: "Error updating workout.",
    description: "There was an unexpected error updating the workout.",
  },
} as const;
