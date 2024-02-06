import TopbarLayout from "../../components/topbar-layout";
import { checkAuthorized } from "../../utils/check-authorized";
import ExerciseTable from "./exercise-table/exercise-table";
import ExerciseToolbar from "./exercise-toolbar";
import Exercises from "./exercises";

export default async function ExercisesPage() {
  const { user } = await checkAuthorized();

  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
          Exercises
        </h3>
        <Exercises user={user} />
      </div>
    </TopbarLayout>
  );
}
