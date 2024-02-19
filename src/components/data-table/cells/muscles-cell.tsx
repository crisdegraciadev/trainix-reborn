import { MuscleTableData } from "@typings/table";
import { CustomCellProps } from "../types";
import { Badge } from "@components/ui/badge";

export function MusclesCell<T>({ row }: CustomCellProps<T>) {
  const muscles: MuscleTableData[] = row.getValue("muscles");

  return (
    <div className="w-[500px]">
      <div className="flex flex-wrap gap-1 ">
        {muscles.length > 5 ? (
          <>
            {muscles.slice(0, 5).map(({ name }, idx) => (
              <Badge key={idx} variant="outline">
                {name}
              </Badge>
            ))}
            <Badge variant="secondary">+ {muscles.length - 5} more</Badge>
          </>
        ) : (
          muscles.map(({ name }, idx) => (
            <Badge key={idx} variant="outline">
              {name}
            </Badge>
          ))
        )}
      </div>
    </div>
  );
}
