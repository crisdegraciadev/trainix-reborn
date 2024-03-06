"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Dot } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button, buttonVariants } from "./button";
import { cn } from "@lib/utils";
import { Calendar } from "./calendar";
import { useState } from "react";
import { Day, DayProps, useActiveModifiers } from "react-day-picker";

function CustomDay(props: DayProps) {
  const { match, selected } = useActiveModifiers(props.date, props.displayMonth);

  return (
    <div className="h-10 relative">
      <Day {...props} />
      {match && (
        <Dot
          className="absolute ml-auto mr-auto left-0 right-0 bottom-0 pointer-events-none"
          strokeWidth={3}
          color={selected ? "white" : "black"}
        />
      )}
    </div>
  );
}

type _ = {
  selectedDate?: Date;
  matchDates?: Date[];
};

export function DatePicker({ selectedDate, matchDates }: _) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-48 h-8 px-3 justify-start text-left font-medium shadow-sm text-xs",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          today={undefined}
          modifiers={{ match: matchDates ?? [] }}
          classNames={{
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-11 w-9 p-0 items-start pt-1 font-normal aria-selected:opacity-100"
            ),
            row: "flex w-full h-10 mt-2",
          }}
          components={{
            Day: CustomDay,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
