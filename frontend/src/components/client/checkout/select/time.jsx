/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from '@/components/ui/Button';
import { cn } from "@/lib/utils";
import { Controller } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"


// Value
const times = [
    {
      name: "7:30",
      value: "7.30am"
    },
    {
      name: "8:30",
      value: "8.30am"
    },
    {
      name: "9:30",
      value: "9.30am"
    },
    {
      name: "10:30",
      value: "10.30am"
    },
    {
      name: "13:30",
      value: "1.30pm"
    },
    {
      name: "14:30",
      value: "2.30pm"
    },
    {
      name: "15:30",
      value: "3.30pm"
    },
    {
      name: "16:30",
      value: "4.30pm"
    }
  ]
  
  export default function SelectTime({ control, name, errors }){
    const [open, setOpen] = React.useState(false)
    return (
      <div>
      <Controller
        control={control}
          name={name}
          rules={{ required: "Vui lòng thời gian!" }}
          render={({ field }) => (
              <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                      <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn("w-full justify-between py-6", 
                          errors[name] && "border-red-500")}
                      >
                          {field.value
                              ? times.find((time) => time.value === field.value)?.name
                              : "Chọn thời gian khám"}
                          <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                      <Command>
                          <CommandInput placeholder="Nhập thời gian" />
                          <CommandList>
                              <CommandEmpty>Không tìm thấy!</CommandEmpty>
                              <CommandGroup>
                                  {times.map((time) => (
                                      <CommandItem
                                          key={time.value}
                                          value={time.value}
                                          onSelect={(currentValue) => {
                                              field.onChange(currentValue);
                                              setOpen(false);
                                          }}
                                      >
                                          <Check
                                              className={cn(
                                                  "mr-2 h-4 w-4",
                                                  field.value === time.value ? "opacity-100" : "opacity-0"
                                              )}
                                          />
                                          {time.name}
                                      </CommandItem>
                                  ))}
                              </CommandGroup>
                          </CommandList>
                      </Command>
                  </PopoverContent>
              </Popover>
          )}
      />
      {errors[name] && (<span className="text-red-500 text-sm">{errors[name].message}</span>)}
  </div>
    )
}