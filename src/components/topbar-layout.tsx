import Topbar from "./topbar";
import { PropsWithChildren } from "react";
import { checkAuthorized } from "../utils/check-authorized";

export default async function TopbarLayout({ children }: PropsWithChildren) {
  const { user } = await checkAuthorized();
  const { name, email } = user;

  return (
    <>
      <Topbar user={{ name, email }} />
      <div className="px-48 py-8 h-[calc(100vh-3.5rem)]">{children}</div>
    </>
  );
  return;
}
