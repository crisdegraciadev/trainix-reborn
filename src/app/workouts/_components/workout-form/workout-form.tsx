"use client";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import MultipleSelector from "@components/ui/multi-select";
import { Textarea } from "@components/ui/textarea";
import { WorkoutFormProps, useWorkoutForm } from "./use-workout-form";
import { ScrollArea } from "@components/ui/scroll-area";
import { cn } from "@lib/utils";
import { Skeleton } from "@components/ui/skeleton";

function WorkoutFormSkeleton() {
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
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-20 w-[500px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-[500px]" />
          <Skeleton className="h-10 w-[500px]" />
          <Skeleton className="h-10 w-[500px]" />
          <Skeleton className="h-10 w-[500px]" />
        </div>

        <div className="w-full flex justify-end">
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
    </div>
  );
}

function DynamicExerciseFields() {}

export default function WorkoutForm(formProps: WorkoutFormProps) {
  const {
    form,
    activityFields,
    appendActivity,
    removeActivity,
    muscles,
    difficulties,
    exercises,
    isFormSubmitting,
    onSubmit,
  } = useWorkoutForm(formProps);

  const { type } = formProps;

  const isFormDataLoading = !muscles || !difficulties || !exercises;

  if (isFormDataLoading) {
    return <WorkoutFormSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
        <ScrollArea className="max-h-[700px] pe-4">
          <div className="px-1 space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Name"
                      type="text"
                      disabled={isFormSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="muscles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muscles</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      options={muscles}
                      hidePlaceholderWhenSelected
                      placeholder="Select muscles"
                      emptyIndicator={
                        <p className="text-center leading-5 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficultyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isFormSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {difficulties.map((difficulty) => (
                            <SelectItem key={difficulty.id} value={difficulty.id}>
                              {difficulty.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      disabled={isFormSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <h3
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  form.formState.errors.activities?.length ? "text-destructive" : ""
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
                          <FormControl>
                            <Select onValueChange={field.onChange} disabled={isFormSubmitting}>
                              <SelectTrigger>
                                <SelectValue placeholder={`Select exercise ${idx + 1}`} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {exercises.map((exercise) => (
                                    <SelectItem key={id} value={exercise.id}>
                                      {exercise.name}
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
                            <Input
                              type="number"
                              placeholder="Sets"
                              disabled={isFormSubmitting}
                              {...field}
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
                            <Input
                              type="number"
                              placeholder="Reps"
                              disabled={isFormSubmitting}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      className="mt-0 w-16"
                      onClick={(e) => removeActivity(e, idx)}
                      size="icon"
                      disabled={isFormSubmitting}
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
                Please fill all the exercises.
              </span>
            )}

            <Button
              className="w-full h-10 mt-2"
              onClick={(e) => appendActivity(e)}
              variant="secondary"
              disabled={isFormSubmitting}
            >
              <PlusCircle />
            </Button>
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button type="submit" className="mt-4" disabled={isFormSubmitting}>
            {isFormSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
