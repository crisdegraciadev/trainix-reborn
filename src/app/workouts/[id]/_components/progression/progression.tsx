import CreateButton from "@components/create-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { WorkoutWithRelations } from "@typings/entities/workout";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import CreateFirstProgressionForm from "./create-first-form/form";
import { progressionColumns } from "./table/columns";
import ProgressionTable from "./table/table";
import { useWorkoutProgression } from "./use-progression";
import TableSkeleton from "@components/loaders/table-skeleton";

type _ = {
  workout: WorkoutWithRelations;
};

function ProgressionBody({ children }: PropsWithChildren) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression</CardTitle>
        <CardDescription>
          Document your workout progression here. Update your last workout to address progresive
          overload.
        </CardDescription>
      </CardHeader>
      <Separator className="mb-8" />
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
}

function CreateFirstProgression() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/4.svg" alt="not found" width={160} height={160} />
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-3 flex items-center gap-1">
        Create your first progression
      </h4>
      <p className="mt-3 text-center">
        Create yout first progression and start tracking your progress.
      </p>
      <div className="mt-3">
        <CreateButton
          title="Create Progression"
          description="Add a new progression to your workout. Click save when you're done."
          label="Progression"
          dialogClassNames="max-w-2xl"
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
        >
          <CreateFirstProgressionForm />
        </CreateButton>
      </div>
    </div>
  );
}

export default function WorkoutProgression({ workout }: _) {
  const { progression, isLoadingProgression } = useWorkoutProgression({
    workout,
  });

  if (isLoadingProgression) {
    return (
      <ProgressionBody>
        <TableSkeleton />
      </ProgressionBody>
    );
  }

  return (
    <ProgressionBody>
      {progression ? (
        <ProgressionTable data={progression.activities} columns={progressionColumns} />
      ) : (
        <CreateFirstProgression />
      )}
    </ProgressionBody>
  );
}
