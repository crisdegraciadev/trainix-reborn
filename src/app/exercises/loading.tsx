import { LoaderCircle } from "lucide-react";

export default async function ExercisesLoading() {
  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">Exercises</h3>
      <div className="w-full pt-64 flex flex-col items-center">
        <LoaderCircle className="animate-spin w-20 h-20" />
        <p className="leading-7 [&:not(:first-child)]:mt-6">Loading exercises...</p>
      </div>
    </>
  );
}
