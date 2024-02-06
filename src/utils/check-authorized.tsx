import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/options";
import { AppRoutes } from "../constants/routes";

export async function checkAuthorized() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const { user } = session;

  if (!user) {
    redirect(AppRoutes.LOGIN);
  }

  return { user };
}
