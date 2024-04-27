import { Input } from "@components/ui/input";
import { Table } from "@tanstack/react-table";
import { ExerciseRow } from "@typings/entities/exercise";

type _ = {
  table: Table<ExerciseRow>;
};

export default function ExerciseSearchbar({ table }: _) {
  return (
    <Input
      placeholder="Filter name..."
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
      className="h-8 w-64"
    />
  );
}
