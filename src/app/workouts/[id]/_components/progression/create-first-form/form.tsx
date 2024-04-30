import { Button } from "@components/ui/button";
import { DatePicker } from "@components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { ScrollArea } from "@components/ui/scroll-area";
import { Skeleton } from "@components/ui/skeleton";
import { cn } from "@lib/utils";
import { Check, ChevronsUpDown, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useFirstProgressionForm } from "./use-form";
import { InputNumber } from "@components/ui/input-number";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/command";

function FormSkeleton() {
  return (
    <div className="flex items-center space-x-4 mt-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-[500px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-[500px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-[500px]" />
        </div>

        <div className="w-full flex justify-end">
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
    </div>
  );
}

export default function CreateFirstProgressionForm() {
  const {
    form,
    activityFields,
    appendActivity,
    removeActivity,
    exercises,
    isExercisesLoading,
    isFormLoading,
    onSubmit,
  } = useFirstProgressionForm();

  if (!exercises || isExercisesLoading) {
    return <FormSkeleton />;
  }

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
                    form.formState.errors.activities?.length ? "text-destructive" : "",
                  )}
                >
                  Exercises
                </h3>

                {activityFields.map(({ id }, idx) => (
                  <div key={id}>
                    <div className="mt-2 flex items-center gap-1">
                      <FormField
                        control={form.control}
                        name={`activities.${idx}.exerciseId`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? exercises.find((exercise) => exercise.value === field.value)
                                          ?.name
                                      : "Select language"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search language..." />
                                  <CommandEmpty>No language found.</CommandEmpty>
                                  <CommandGroup>
                                    {exercises.map((exercise) => (
                                      <CommandItem
                                        value={exercise.name}
                                        key={exercise.value}
                                        onSelect={() => {
                                          form.setValue(
                                            `activities.${idx}.exerciseId`,
                                            exercise.value,
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            exercise.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {exercise.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`activities.${idx}.sets`}
                        render={({ field }) => (
                          <FormItem className="w-32">
                            <FormControl>
                              <InputNumber
                                placeholder="Sets"
                                {...field}
                                form={form}
                                controlName={`activities.${idx}.sets`}
                              />
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
                              <InputNumber
                                placeholder="Reps"
                                {...field}
                                form={form}
                                controlName={`activities.${idx}.reps`}
                              />
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
