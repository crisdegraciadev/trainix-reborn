import TopbarLayout from "@components/topbar-layout";
import Workouts from "./_components/workouts";
import { checkAuthorized } from "@utils/check-authorized";

export default async function WorkoutPage() {
  const { user } = await checkAuthorized();

  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">Workouts</h3>
        <Workouts user={user} />
      </div>
    </TopbarLayout>
  );
}
