import { Input } from "@components/ui/input";
import { Table } from "@tanstack/react-table";
import { WorkoutRow } from "@typings/entities/workout";

type _ = {
  table: Table<WorkoutRow>;
};

export default function WorkoutSearchbar({ table }: _) {
  return (
    <Input
      placeholder="Filter name..."
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
      className="h-8 w-64"
    />
  );
}
