import { Table } from "@tanstack/react-table";
import { ExerciseRow } from "@typings/entities/exercise";
import CreateExerciseButton from "./create";
import ExerciseSearchbar from "./searchbar";

type _ = {
  table: Table<ExerciseRow>;
};

function FacetedFilter() {}

export default function ExerciseToolbar({ table }: _) {
  return (
    <div className="flex justify-between mb-4">
      <ExerciseSearchbar table={table} />
      <CreateExerciseButton />
    </div>
  );
}
