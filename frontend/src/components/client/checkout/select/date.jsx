/* eslint-disable react/prop-types */
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { Controller } from 'react-hook-form';

export default function SelectDate({ control, name, errors }) {
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = React.useState(null);
  const today = new Date();

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn ngày khám" }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal py-6",
                  !field.value && "text-muted-foreground",
                  errors[name] && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(new Date(field.value), "PPP") : <span>Chọn ngày khám</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : null}
                onSelect={(selectedDate) => {
                  if (selectedDate && selectedDate >= today) { 
                    setDate(selectedDate);
                    field.onChange(format(selectedDate, "yyyy-MM-dd")); 
                  }
                }}
                initialFocus
                minDate={today}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
    </div>
  );
}
