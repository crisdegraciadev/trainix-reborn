import { Table } from "@tanstack/react-table";
import { WorkoutRow } from "@typings/entities/workout";
import CreateWorkoutButton from "./create";
import { useFindMusclesOptions } from "@hooks/muscles/use-find-muscles-options";
import { useFindDifficultiesOptions } from "@hooks/difficulties/use-find-difficulties-options";
import FacetedFilter from "@components/data-table/tools/faceted-filter";
import TableSearchbar from "@components/data-table/tools/searchbar";

type _ = {
  table: Table<WorkoutRow>;
};

export default function WorkoutToolbar({ table }: _) {
  const { data: musclesOptions } = useFindMusclesOptions();
  const { data: difficultiesOptions } = useFindDifficultiesOptions();

  const musclesColumn = table.getColumn("muscles");
  const difficultyColumn = table.getColumn("difficulty");

  return (
    <div className="flex justify-between mb-4">
      <div className="flex gap-1">
        <TableSearchbar table={table} columnName="name" />

        {musclesColumn && musclesOptions && (
          <FacetedFilter title="Muscles" column={musclesColumn} options={musclesOptions} />
        )}

        {difficultyColumn && difficultiesOptions && (
          <FacetedFilter
            title="Difficulties"
            column={difficultyColumn}
            options={difficultiesOptions}
          />
        )}
      </div>

      <CreateWorkoutButton />
    </div>
  );
}
