"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative flex items-center justify-start px-6 py-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full text-slate-600 dark:text-slate-400 group"
        >
            <span className="font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
        </button>
    )
}
