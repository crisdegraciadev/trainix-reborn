import { serverClient } from "@server/server-client";
import Workouts from "./_components/workouts";
import { checkAuthorized } from "@utils/check-authorized";

export default async function Page() {
  const { user } = await checkAuthorized();
  const workouts = await serverClient.workouts.findWorkoutRows({ userId: user.id });

  console.log({ workouts });

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">Workouts</h3>
      <Workouts user={user} />
    </>
  );
}
