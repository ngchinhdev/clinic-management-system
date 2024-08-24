/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from '@/components/ui/Button';
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
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
import { Check, ChevronsUpDown } from "lucide-react";
const departments = [
    { label: "Đa khoa DIAMOND 1", value: "pk1" },
    { label: "Đa khoa DIAMOND 2", value: "pk2" },
    { label: "Đa khoa DIAMOND 3", value: "pk3" },
    { label: "Đa khoa DIAMOND 4", value: "pk4" },
    { label: "Đa khoa DIAMOND 5", value: "pk5" },
];
export default function SelectDepartment({ control, name, errors }) {
    const [open, setOpen] = React.useState(false);
    
    return (
        <div>
            <Controller
                control={control}
                name={name}
                rules={{ required: "Vui lòng chọn một khoa." }} 
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                    "w-full justify-between py-5",
                                    errors[name] && "border-red-500"
                                )}
                            >
                                {field.value
                                    ? departments.find((department) => department.value === field.value)?.label
                                    : "Chọn khoa"}
                                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Nhập tên khoa" />
                                <CommandList>
                                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                    <CommandGroup>
                                        {departments.map((department) => (
                                            <CommandItem
                                                key={department.value}
                                                value={department.value}
                                                onSelect={(currentValue) => {
                                                    field.onChange(currentValue === field.value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === department.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {department.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            />
            {errors[name] && (
                <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>
            )}
        </div>
    )
}
