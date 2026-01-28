"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

// Estilos inyectados para evitar configurar CSS global
const customStyles = `
  .react-datepicker { font-family: inherit; border: none; box-shadow: none; }
  .react-datepicker__header { background-color: white; border-bottom: none; }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected { 
    background-color: #10b981 !important; 
    color: white; 
    border-radius: 50%;
    font-weight: bold;
  }
  .react-datepicker__day:hover { background-color: #f3f4f6; border-radius: 50%; }
  .react-datepicker__day-name { color: #6b7280; width: 2.5rem; }
  .react-datepicker__day { width: 2.5rem; line-height: 2.5rem; }
  .react-datepicker__navigation { top: 12px; }
`;

interface SimpleCalendarProps {
    selected: Date | undefined;
    onSelect: (date: Date | null) => void;
    className?: string;
}

export function SimpleCalendar({ selected, onSelect, className }: SimpleCalendarProps) {
    return (
        <div className={cn("p-4 bg-white rounded-xl border shadow-sm flex justify-center", className)}>
            <style>{customStyles}</style>
            <DatePicker
                selected={selected}
                onChange={onSelect}
                inline
            />
        </div>
    );
}
