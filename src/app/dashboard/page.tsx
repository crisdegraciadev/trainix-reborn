import TopbarLayout from "@components/topbar-layout";
import WorkoutButton from "./workout-button";

export default async function DashboardPage() {
  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">Weekly Planning</h3>
        <div>
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
        <div className="mt-8">Second half</div>
      </div>
    </TopbarLayout>
  );
}
