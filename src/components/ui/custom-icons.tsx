import { cn } from "@lib/utils";

type _ = {
  className: string;
};

export const CircleCheck = ({ className }: _) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={cn("lucide lucide-circle-check", className)}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
