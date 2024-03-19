import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { ScrollArea } from "@components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { cn } from "@lib/utils";
import { Circle, CircleX, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useProgressionForm } from "./use-progression-form";
import { DatePicker } from "@components/ui/date-picker";
import { CircleCheck } from "@components/ui/custom-icons";

export default function ProgressionForm() {
  const {
    form,
    activityFields,
    appendActivity,
    removeActivity,
    improvementFields,
    currentProgression,
    exercisesOptions,
    isFormLoading,
    onSubmit,
  } = useProgressionForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
        <ScrollArea className="max-h-[700px] pe-4">
          <div className="px-1 space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Creation date</FormLabel>
                  <DatePicker
                    styles={["w-full"]}
                    selectedDate={field.value}
                    onSelect={field.onChange}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="space-y-2">
                <h3
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    form.formState.errors.improvements?.length ? "text-destructive" : ""
                  )}
                >
                  Improvements
                </h3>

                {improvementFields.map(({ id, name, sets, reps }, idx) => (
                  <div className="flex" key={id}>
                    <FormField
                      control={form.control}
                      name={`improvements.${idx}.improve`}
                      render={({ field }) => (
                        <div className="flex grow gap-1">
                          <Input className="w-3/6" value={name} disabled />
                          <Input className="w-1/6" value={sets} disabled />
                          <Input className="w-1/6" value={reps} disabled />
                          <FormItem className="w-2/6">
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select state`} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>{name}</SelectLabel>
                                  <SelectItem value="+">
                                    <div className="flex items-center">
                                      <CircleCheck className="w-4 h-4 mr-2 text-green-600" />
                                      Move On
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="=">
                                    <div className="flex items-center">
                                      <Circle className="w-4 h-4 mr-2 text-blue-600" />
                                      Maintain
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="-">
                                    <div className="flex items-center">
                                      <CircleX className="w-4 h-4 mr-2 text-red-600" />
                                      Slow Down
                                    </div>
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-2">
                <h3
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    form.formState.errors.activities?.length ? "text-destructive" : ""
                  )}
                >
                  Exercises
                </h3>

                {activityFields.map(({ id, exerciseId }, idx) => (
                  <div key={id}>
                    <div className="mt-2 flex items-center gap-1">
                      <FormField
                        control={form.control}
                        name={`activities.${idx}.exerciseId`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={exerciseId}>
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select exercise ${idx + 1}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {exercisesOptions.map(({ id, value, name: label }) => (
                                      <SelectItem key={id} value={value}>
                                        {label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`activities.${idx}.sets`}
                        render={({ field }) => (
                          <FormItem className="w-32">
                            <FormControl>
                              <Input placeholder="Sets" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`activities.${idx}.reps`}
                        render={({ field }) => (
                          <FormItem className="w-32">
                            <FormControl>
                              <Input placeholder="Reps" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        className="mt-0 w-16"
                        onClick={(e) => removeActivity(e, idx)}
                        size="icon"
                        variant="outline"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {form.formState.errors.activities?.length && (
                <span className="text-sm font-medium text-destructive">
                  Please fill all the exercises and ensure that reps and sets are numbers.
                </span>
              )}

              <Button
                className="w-full h-10 mt-2"
                onClick={(e) => appendActivity(e)}
                variant="secondary"
                disabled={isFormLoading}
              >
                <PlusCircle />
              </Button>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button type="submit" className="mt-4" disabled={isFormLoading}>
            {isFormLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
