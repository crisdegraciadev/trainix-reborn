import { checkAuthorized } from "@utils/check-authorized";
import Topbar from "./topbar";
import { PropsWithChildren } from "react";
import Footer from "./footer";

export default async function TopbarLayout({ children }: PropsWithChildren) {
  const { user } = await checkAuthorized();
  const { name, email } = user;

  return (
    <div className="h-full">
      <Topbar user={{ name, email }} />
      <div className="px-48 py-8 my-14 h-full">{children}</div>
      <Footer />
    </div>
  );
}
