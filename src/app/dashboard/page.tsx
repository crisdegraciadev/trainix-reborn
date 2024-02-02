import { ChevronRight, Dumbbell } from "lucide-react";
import WithAuthLayout from "../../components/WithAuthLayout";
import { Button } from "../../components/ui/button";

function WorkoutButton() {
  return (
    <div className="flex justify-center items-center">
      <Button className="size-48" variant="outline" size="icon">
        <div className="flex flex-col items-center h-full justify-end mb-8">
          <Dumbbell className="h-10 w-10 mb-6" />
          <span className="text-base">Muscle Up</span>
        </div>
      </Button>
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <WithAuthLayout>
      <div className="flex flex-col h-full">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
          Weekly Planning
        </h3>
        <div className="h-1/4">
          <div className="grid grid-cols-7 w-full">
            <WorkoutButton />
            <WorkoutButton />
            <WorkoutButton />
            <WorkoutButton />
            <WorkoutButton />
            <WorkoutButton />
            <WorkoutButton />
          </div>
        </div>
        <div>Second half</div>
      </div>
    </WithAuthLayout>
  );
}
