"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"

export default function DatePicker({date, setDate, placeholder}: {
    date: Date | null,
    setDate: (date: Date) => any,
    placeholder: string
}) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={cn(
                        "w-full text-xs md:text-sm justify-start text-left font-normal border border-gray-200",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-1 h-4 w-3" />
                    {date ? format(date, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(day) => day && setDate(day)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
