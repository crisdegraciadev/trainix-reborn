import { Table } from "@tanstack/react-table";
import { WorkoutRow } from "@typings/entities/workout";
import CreateWorkoutButton from "./create";
import WorkoutSearchbar from "./searchbar";

type _ = {
  table: Table<WorkoutRow>;
};

export default function WorkoutToolbar({ table }: _) {
  return (
    <div className="flex justify-between mb-4">
      <WorkoutSearchbar table={table} />
      <CreateWorkoutButton />
    </div>
  );
}
