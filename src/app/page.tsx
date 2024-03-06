import { AppRoutes } from "@constants/routes";
import { checkAuthorized } from "@utils/check-authorized";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await checkAuthorized();

  if (user) {
    redirect(AppRoutes.WORKOUTS);
  }

  return <div>Future landing page</div>;
}
