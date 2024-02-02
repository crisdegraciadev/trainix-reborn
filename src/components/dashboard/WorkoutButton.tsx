import { Dumbbell } from "lucide-react";
import { Button } from "../ui/button";

export default function WorkoutButton() {
  return (
    <div className="flex justify-center items-center">
      <Button className="size-48" variant="outline" size="icon">
        <div className="flex flex-col items-center h-full justify-around">
          <span className="font-light text-muted-foreground mb-2">Monday</span>
          <Dumbbell className="h-12 w-12" />
          <span className="text-xl">Muscle Up</span>
        </div>
      </Button>
    </div>
  );
}
