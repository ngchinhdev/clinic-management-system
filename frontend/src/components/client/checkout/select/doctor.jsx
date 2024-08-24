/* eslint-disable react/prop-types */
import React from 'react';
import { Controller } from 'react-hook-form';
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
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
// Value
const doctors = [
    {
        name: "BS.Nguyễn Văn Bình",
        value: "BSBinh1101"
    },
    {
        name: "BS.Nguyễn Lệ Quyên",
        value: "BSQuyen1437"
    },
    {
        name: "BS.Trần Hải",
        value: "BSHai1904"
    },
    {
        name: "BS.Nguyễn Hòa Hảo",
        value: "BSHao9019"
    },
    {
        name: "BS.Lê Bá Đạt",
        value: "BSDat0198"
    },
    {
        name: "BS.Cao Cường Vỹ",
        value: "BSVy9014"
    },
];
export default function SelectDoctor({ control, name, errors }) {
  const [open, setOpen] = React.useState(false);


    return (
        <div>
            <Controller
              control={control}
                name={name}
                rules={{ required: "Vui lòng chọn bác sĩ" }}
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
                                    ? doctors.find((doctor) => doctor.value === field.value)?.name
                                    : "Chọn bác sĩ"}
                                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Nhập tên bác sĩ" />
                                <CommandList>
                                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                    <CommandGroup>
                                        {doctors.map((doctor) => (
                                            <CommandItem
                                                key={doctor.value}
                                                value={doctor.value}
                                                onSelect={(currentValue) => {
                                                    field.onChange(currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === doctor.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {doctor.name}
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
    );
}
