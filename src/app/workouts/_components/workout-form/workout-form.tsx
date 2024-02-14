"use client";

import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Loader2 } from "lucide-react";
import MultipleSelector from "@components/ui/multi-select";
import { Textarea } from "@components/ui/textarea";
import { WorkoutFormProps, useWorkoutForm } from "./use-workout-form";

export default function WorkoutForm(formProps: WorkoutFormProps) {
  const { form, musclesOptions, difficultiesOptions, isFormLoading, onSubmit } = useWorkoutForm({ ...formProps });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Name" type="text" disabled={isFormLoading} {...field} />
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
              <FormLabel className="sr-only">Muscles</FormLabel>
              <FormControl>
                <MultipleSelector
                  options={musclesOptions}
                  hidePlaceholderWhenSelected
                  placeholder="Select muscles"
                  emptyIndicator={
                    <p className="text-center leading-5 text-gray-600 dark:text-gray-400">no results found.</p>
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
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Difficulty</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {difficultiesOptions.map(({ id, value, name: label }) => (
                        <SelectItem key={id} value={value}>
                          {label}
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
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <Textarea id="description" placeholder="Description" disabled={isFormLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="mt-2" disabled={isFormLoading}>
            {isFormLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
