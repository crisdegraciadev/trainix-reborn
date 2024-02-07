import TopbarLayout from "../../components/topbar-layout";
import { checkAuthorized } from "../../utils/check-authorized";
import Exercises from "./components/exercises";

export default async function ExercisesPage() {
  const { user } = await checkAuthorized();

  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">Exercises</h3>
        <Exercises user={user} />
      </div>
    </TopbarLayout>
  );
}
