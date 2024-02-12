import Topbar from "./topbar";
import { PropsWithChildren } from "react";
import { checkAuthorized } from "../utils/check-authorized";

export default async function TopbarLayout({ children }: PropsWithChildren) {
  const { user } = await checkAuthorized();
  const { name, email } = user;

  return (
    <>
      <Topbar user={{ name, email }} />
      <div className="px-48 pt-8 my-14">{children}</div>
    </>
  );
  return;
}
