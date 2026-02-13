"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full gap-3 text-slate-600 dark:text-slate-400 group"
        >
            <div className="relative w-5 h-5">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute top-0 left-0" />
                <Moon className="absolute top-0 left-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            <span className="font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
        </button>
    )
}
