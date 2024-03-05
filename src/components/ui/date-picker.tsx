"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Dot } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@lib/utils";
import { Calendar } from "./calendar";
import { useState } from "react";

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
          modifiersClassNames={{ match: "bg-accent text-accent-foreground" }}
        />
      </PopoverContent>
    </Popover>
  );
}
