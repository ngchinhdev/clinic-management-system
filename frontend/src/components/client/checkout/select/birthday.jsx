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

export default function SelectBirthDate({ control, name, errors }) {
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = React.useState(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn ngày sinh" }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal py-6",
                  !field.value && "text-muted-foreground",
                  errors[name] && ""
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(new Date(field.value), "PPP") : <span>Chọn ngày sinh</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : null}
                onSelect={(selectedDate) => {
                  if (selectedDate && selectedDate <= today) {
                    setSelectedDate(selectedDate);
                    field.onChange(format(selectedDate, "yyyy-MM-dd")); 
                  } else {
                    console.error("Ngày sinh không thể là ngày trong tương lai");
                  }
                }}
                initialFocus
                maxDate={today} 
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
    </div>
  );
}
