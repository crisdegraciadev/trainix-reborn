import { LoaderCircle } from "lucide-react";

export default function WorkoutLoading() {
  return (
    <div className="w-full pt-64 flex flex-col items-center">
      <LoaderCircle className="animate-spin w-20 h-20" />
      <p className="leading-7 [&:not(:first-child)]:mt-6">Loading workouts...</p>
    </div>
  );
}
