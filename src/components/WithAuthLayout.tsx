import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/options";
import { AppRoutes } from "../constants/routes";
import Topbar from "./Topbar";
import { PropsWithChildren } from "react";

export default async function WithAuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(AppRoutes.LOGIN);
  }

  const { user } = session;

  if (!user?.email || !user?.name) {
    redirect(AppRoutes.LOGIN);
  }

  const { name, email } = user;

  return (
    <>
      <Topbar user={{ name, email }} />
      <div className="px-48 py-8 h-[calc(100vh-3.5rem)]">{children}</div>
    </>
  );
  return;
}
