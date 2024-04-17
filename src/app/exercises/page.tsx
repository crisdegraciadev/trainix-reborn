import { checkAuthorized } from "@utils/check-authorized";
import Exercises from "./_components/exercises";

export default async function ExercisesPage() {
  const { user } = await checkAuthorized();

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">Exercises</h3>
      <Exercises user={user} />
    </>
  );
}
