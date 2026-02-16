"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

// Estilos inyectados para evitar configurar CSS global
const customStyles = `
  .react-datepicker { font-family: inherit; border: none; background: transparent; }
  .react-datepicker__header { background: transparent; border-bottom: none; }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected { 
    background-color: #05D16E !important; 
    color: #F9F8F2; 
    border-radius: 12px;
    font-weight: bold;
  }
  .react-datepicker__day:hover { background-color: #024653/10; border-radius: 12px; }
  .react-datepicker__day-name { color: #024653/40; width: 2.2rem; font-weight: bold; text-transform: uppercase; font-size: 9px; }
  .react-datepicker__day { width: 2.2rem; line-height: 2.2rem; color: #024653; font-size: 11px; }
  .react-datepicker__current-month { color: #024653; font-weight: 800; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; }
  .react-datepicker__navigation { top: 12px; }
`;

interface SimpleCalendarProps {
    selected: Date | undefined;
    onSelect: (date: Date | null) => void;
    className?: string;
    mode?: any; // Compatibility
    onSelectMode?: any; // Compatibility
    disabled?: (date: Date) => boolean;
}

export function SimpleCalendar({ selected, onSelect, className }: SimpleCalendarProps) {
    return (
        <div className={cn("bg-transparent flex justify-center", className)}>
            <style>{customStyles}</style>
            <DatePicker
                selected={selected}
                onChange={onSelect}
                inline
                calendarClassName="bg-transparent"
            />
        </div>
    );
}
