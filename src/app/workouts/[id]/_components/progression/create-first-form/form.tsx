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
import { Input } from "@components/ui/input";
import { ScrollArea } from "@components/ui/scroll-area";
import {
  NameValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { cn } from "@lib/utils";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useFirstProgressionForm } from "./use-form";

export default function CreateFirstProgressionForm() {
  const {
    form,
    activityFields,
    appendActivity,
    removeActivity,
    exercisesOptions,
    isFormLoading,
    onSubmit,
  } = useFirstProgressionForm();

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
                                      <NameValue key={id} value={value}>
                                        {label}
                                      </NameValue>
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
