import TopbarLayout from "@components/topbar-layout";
import { AppRoutes } from "@constants/routes";
import db from "@lib/prisma";
import { checkAuthorized } from "@utils/check-authorized";
import { redirect } from "next/navigation";
import WorkoutDetails from "./_components/workout-details";

type _Props = {
  params: { id: string };
};

export default async function Page({ params }: _Props) {
  await checkAuthorized();

  const { id } = params;

  const workout = await db.workout.findUnique({
    where: { id },
    include: {
      difficulty: true,
      muscles: true,
      progressions: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!workout) {
    redirect(AppRoutes.WORKOUTS);
  }

  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">{workout.name}</h3>
        <WorkoutDetails workout={workout} />
      </div>
    </TopbarLayout>
  );
}
