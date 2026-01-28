"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Utility for class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "grid grid-cols-7 mb-2 w-full",
                head_cell:
                    "text-stone-500 font-normal text-[0.8rem] text-center flex items-center justify-center pt-1 pb-2",
                row: "grid grid-cols-7 mt-2 w-full",
                cell: "h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center focus-within:relative focus-within:z-20",
                day: cn(
                    "h-9 w-9 p-0 font-normal flex items-center justify-center rounded-full transition-colors duration-200",
                    "hover:bg-slate-100",
                    "aria-selected:!bg-[#024653] aria-selected:!text-white aria-selected:opacity-100",
                    "hover:aria-selected:!bg-[#024653] focus:aria-selected:!bg-[#024653]"
                ),
                day_range_end: "day-range-end",
                day_selected: "",
                day_today: "bg-slate-100 text-[#024653] font-semibold",
                day_outside:
                    "day-outside text-stone-500 opacity-50 aria-selected:bg-stone-100/50 aria-selected:text-stone-500 aria-selected:opacity-30 dark:text-stone-400 dark:aria-selected:bg-stone-800/50 dark:aria-selected:text-stone-400",
                day_disabled: "text-stone-500 opacity-50 dark:text-stone-400",
                day_range_middle:
                    "aria-selected:bg-stone-100 aria-selected:text-stone-900 dark:aria-selected:bg-stone-800 dark:aria-selected:text-stone-50",
                day_hidden: "invisible",
                ...classNames,
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
