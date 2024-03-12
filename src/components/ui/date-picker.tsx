"use client";

import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Dot } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button, buttonVariants } from "./button";
import { cn } from "@lib/utils";
import { Calendar } from "./calendar";
import { useEffect, useState } from "react";
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

type _ = Partial<{
  selectedDate: Date;
  matchDates: Date[];
  styles: string[];
  onDatePicked: (date: Date) => void;
  disableAllExceptMatchDates: boolean;
}>;

export function DatePicker({
  selectedDate,
  matchDates,
  styles,
  onDatePicked,
  disableAllExceptMatchDates,
}: _) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);

  const handleSelect = (date?: Date) => {
    setDate(date);

    if (date && onDatePicked) {
      var userTimezoneOffset = date.getTimezoneOffset() * 60000;
      onDatePicked(new Date(date.getTime() - userTimezoneOffset));
    }
  };

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-48 h-8 px-3 justify-start text-left font-medium shadow-sm text-xs",
            !date && "text-muted-foreground",
            styles ? styles : ""
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={(day) =>
            !(
              disableAllExceptMatchDates &&
              matchDates &&
              matchDates.some((disabledDay) => isSameDay(day, disabledDay))
            )
          }
          mode="single"
          selected={date}
          onSelect={handleSelect}
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
