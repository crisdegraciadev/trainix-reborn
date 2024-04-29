import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Skeleton } from "@components/ui/skeleton";

type _ = {
  title: string;
  description: string;
};

export default function WorkoutDetailsSkeleton({ title, description }: _) {
  return (
    <Card className="min-h-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <Separator className="mb-8" />

      <CardContent className="flex gap-16">
        <div className="w-full  flex flex-col space-y-2">
          <Skeleton className="w-full h-[500px] rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
