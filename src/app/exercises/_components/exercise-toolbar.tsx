"use client";

import CreateExerciseButton from "./create-exercise-button";

export default function ExerciseToolbar() {
  return (
    <div className="flex justify-between mb-4">
      <div>Searchbar</div>
      <>
        <CreateExerciseButton />
      </>
    </div>
  );
}
