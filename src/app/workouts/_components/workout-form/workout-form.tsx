"use client";

import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import MultipleSelector from "@components/ui/multi-select";
import { Textarea } from "@components/ui/textarea";
import { WorkoutFormProps, useWorkoutForm } from "./use-workout-form";
import { ScrollArea } from "@components/ui/scroll-area";

export default function WorkoutForm(formProps: WorkoutFormProps) {
  const {
    form,
    activityFields,
    appendActivity,
    removeActivity,
    musclesOptions,
    difficultiesOptions,
    isFormLoading,
    onSubmit,
  } = useWorkoutForm({
    ...formProps,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
        <ScrollArea className="max-h-[700px] pe-4">
          <div className="px-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Name" type="text" disabled={isFormLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea id="description" placeholder="Description" disabled={isFormLoading} {...field} />
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
                <FormItem className="mb-2">
                  <FormLabel>Difficulty</FormLabel>
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

            <h3 className="text-sm mt-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Exercises
            </h3>

            {activityFields.map((_, idx) => (
              <FormField
                key={idx}
                control={form.control}
                name={`activities.${idx}.exerciseId`}
                render={({ field }) => (
                  <FormItem className=" mt-2">
                    <div className="flex items-center gap-1">
                      <FormControl>
                        <>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select exercise ${idx + 1}`} />
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
                          <Input className="w-20" type="number" placeholder="Sets" />
                          <Input className="w-20" type="number" placeholder="Reps" />
                        </>
                      </FormControl>
                      <Button
                        className="mt-0 w-16"
                        onClick={(e) => removeActivity(e, idx)}
                        size="icon"
                        variant="outline"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              className="w-full mt-2"
              onClick={(e) => appendActivity(e)}
              variant="secondary"
              disabled={isFormLoading}
            >
              <PlusCircle />
            </Button>
          </div>
        </ScrollArea>

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
