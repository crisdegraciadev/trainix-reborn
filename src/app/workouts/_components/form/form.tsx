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
import MultipleSelector from "@components/ui/multi-select";
import {
  NameValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Skeleton } from "@components/ui/skeleton";
import { Textarea } from "@components/ui/textarea";
import { Loader2 } from "lucide-react";
import { WorkoutFormProps, useWorkoutForm } from "./use-form";

function LoadingFormSkeleton() {
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

        <div className="w-full flex justify-end">
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
    </div>
  );
}

export default function WorkoutForm(formProps: WorkoutFormProps) {
  const { form, muscles, difficulties, exercises, isFormSubmitting, onSubmit } =
    useWorkoutForm(formProps);

  const isFormDataLoading = !muscles || !difficulties || !exercises;

  if (isFormDataLoading) {
    return <LoadingFormSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
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
                          <NameValue key={difficulty.id} value={difficulty.id}>
                            {difficulty.name}
                          </NameValue>
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
        </div>

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
