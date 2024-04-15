import TopbarLayout from "@components/topbar-layout";
import { PropsWithChildren } from "react";

export default function WorkoutLayout({ children }: PropsWithChildren) {
  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">{children}</div>
    </TopbarLayout>
  );
}
