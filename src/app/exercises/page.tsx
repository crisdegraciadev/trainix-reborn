import TopbarLayout from "../../components/topbar-layout";
import db from "../../lib/prisma";
import { checkAuthorized } from "../../utils/use-auth";
import { exerciseColumns } from "./exercise-columns";
import ExerciseTable from "./exercise-table";
import ExerciseToolbar from "./exercise-toolbar";

export default async function ExercisesPage() {
  const { user } = await checkAuthorized();
  const { id: userId } = user;

  const exercises = await db.exercise.findMany({ where: { userId } });

  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
          Exercises
        </h3>
        <ExerciseToolbar />
        <ExerciseTable data={exercises} columns={exerciseColumns} />
      </div>
    </TopbarLayout>
  );
}
