import TopbarLayout from "@components/layout/topbar-layout";
import { PropsWithChildren } from "react";

export default function WorkoutsLayout({ children }: PropsWithChildren) {
  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">{children}</div>
    </TopbarLayout>
  );
}
