/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from '@/components/ui/Button';
import { cn } from "@/lib/utils";
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
import { Controller } from 'react-hook-form';


// Value
const rooms = [
    {
      name: "Phòng khám số 1",
      value: "p1"
    },
    {
      name: "Phòng khám số 2",
      value: "p2"
    },
    {
      name: "Phòng khám số 3",
      value: "p3"
    },
    {
      name: "Phòng khám số 4",
      value: "p4"
    },
    {
      name: "Phòng khám số 5",
      value: "p5"
    },
    {
      name: "Phòng khám số 6",
      value: "p6"
    },
    {
      name: "Phòng khám số 7",
      value: "p7"
    },
    {
      name: "Phòng khám số 8",
      value: "p8"
    }
  ]
  
  export default function SelectRoom({ control, name, errors }){
    const [open, setOpen] = React.useState(false)
    return (
      <div>
      <Controller
        control={control}
          name={name}
          rules={{ required: "Vui lòng chọn phòng!" }}
          render={({ field }) => (
              <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                      <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn("w-full justify-between py-5", 
                          errors[name] && "border-red-500")}
                      >
                          {field.value
                              ? rooms.find((room) => room.value === field.value)?.name
                              : "Chọn phòng khám"}
                          <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                      <Command>
                          <CommandInput placeholder="Nhập tên phòng khám" />
                          <CommandList>
                              <CommandEmpty>Không tìm thấy!</CommandEmpty>
                              <CommandGroup>
                                  {rooms.map((room) => (
                                      <CommandItem
                                          key={room.value}
                                          value={room.value}
                                          onSelect={(currentValue) => {
                                              field.onChange(currentValue);
                                              setOpen(false);
                                          }}
                                      >
                                          <Check
                                              className={cn(
                                                  "mr-2 h-4 w-4",
                                                  field.value === room.value ? "opacity-100" : "opacity-0"
                                              )}
                                          />
                                          {room.name}
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