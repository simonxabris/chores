"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  name: string;
  id: string;
}

export function DatePicker({ name, id }: DatePickerProps) {
  const [date, setDate] = React.useState<string>("");

  return (
    <>
      <input type="hidden" id={id} name={name} value={date} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(date)}
            onSelect={(date) => {
              if (date) {
                setDate(date.toISOString());
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
