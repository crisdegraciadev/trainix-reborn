import { useFindLastProgression } from "@hooks/progression/use-find-last-progression";
import { WorkoutWithRelations } from "@typings/entities/workout";

type _ = {
  workout: WorkoutWithRelations;
};

export const useWorkoutResume = ({ workout }: _) => {
  const { data: currentProgression, isLoading: isProgressionLoading } = useFindLastProgression({
    workoutId: workout.id,
    isCompleted: true,
  });

  return { currentProgression, isProgressionLoading };
};
