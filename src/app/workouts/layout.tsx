import TopbarLayout from "@components/topbar-layout";
import { PropsWithChildren } from "react";

export default function WorkoutLayout({ children }: PropsWithChildren) {
  return (
    <TopbarLayout>
      <div className="flex flex-col h-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">Workouts</h3>
        {children}
      </div>
    </TopbarLayout>
  );
}
