import { Table } from "@tanstack/react-table";
import { ExerciseRow } from "@typings/entities/exercise";
import CreateExerciseButton from "./create";
import ExerciseSearchbar from "./searchbar";
import ExerciseFacetedFilter from "./faceted-filter";
import { useFindMusclesOptions } from "@hooks/muscles/use-find-muscles-options";
import { useFindDifficultiesOptions } from "@hooks/difficulties/use-find-difficulties-options";

type _ = {
  table: Table<ExerciseRow>;
};

export default function ExerciseToolbar({ table }: _) {
  const { data: musclesOptions } = useFindMusclesOptions();
  const { data: difficultiesOptions } = useFindDifficultiesOptions();

  const musclesColumn = table.getColumn("muscles");
  const difficultyColumn = table.getColumn("difficulty");

  return (
    <div className="flex justify-between mb-4">
      <div className="flex gap-1">
        <ExerciseSearchbar table={table} />

        {musclesColumn && musclesOptions && (
          <ExerciseFacetedFilter title="Muscles" column={musclesColumn} options={musclesOptions} />
        )}

        {difficultyColumn && difficultiesOptions && (
          <ExerciseFacetedFilter
            title="Difficulties"
            column={difficultyColumn}
            options={difficultiesOptions}
          />
        )}
      </div>
      <CreateExerciseButton />
    </div>
  );
}
