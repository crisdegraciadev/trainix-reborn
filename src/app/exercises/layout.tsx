import TopbarLayout from "@components/layout/topbar-layout";
import { PropsWithChildren } from "react";

export default function ExercisesLayout({ children }: PropsWithChildren) {
  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">{children}</div>
    </TopbarLayout>
  );
}
