import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { WorkoutActivityFormSchema, WorkoutFormSchema } from "./workout-schema";

type ActivityData = {
  exerciseId: number;
  sets: number;
  reps: number;
};

const exercises = [{ id: "1", value: "1", label: "Push Up" }];

type Props = {
  field: ControllerRenderProps<{
    name: string;
    difficulty: string;
    muscles: {
      name: string;
      value: string;
      id: string;
    }[];
    activities: {
      exerciseId: number;
      sets: number;
      reps: number;
    }[];
    description?: string | undefined;
  }>;
  idx: number;
};

export default function ActivityInput({ field, idx }: Props) {
  const [activityData, setActivityData] = useState({ exerciseId: -1, sets: 0, reps: 0 });

  const updateActivityData = (data: ActivityData) => {
    setActivityData(data);
    field.value;
    field.value = data;
    field.onChange();
  };

  return (
    <>
      <Select onValueChange={(exerciseId) => updateActivityData({ ...activityData, exerciseId: Number(exerciseId) })}>
        <SelectTrigger>
          <SelectValue placeholder={`Select exercise ${idx + 1}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {exercises.map(({ id, value, label }) => (
              <SelectItem key={id} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        onChange={(sets) => updateActivityData({ ...activityData, sets: Number(sets.target.value) })}
        className="w-20"
        type="number"
        placeholder="Sets"
      />
      <Input
        onChange={(reps) => updateActivityData({ ...activityData, reps: Number(reps.target.value) })}
        className="w-20"
        type="number"
        placeholder="Reps"
      />
    </>
  );
}
