import { checkAuthorized } from "@utils/check-authorized";
import Topbar from "./topbar";
import { PropsWithChildren } from "react";
import Footer from "./footer";

export default async function TopbarLayout({ children }: PropsWithChildren) {
  const { user } = await checkAuthorized();
  const { name, email } = user;

  return (
    <div className="">
      <Topbar user={{ name, email }} />
      <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 2xl:px-48 py-8 my-14 w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
