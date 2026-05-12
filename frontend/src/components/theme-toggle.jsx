import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Switch } from "./ui/switch"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

export function ThemeToggle({ isCollapsed, variant = "sidebar" }) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  if (variant === "minimal") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg relative group transition-all"
        onClick={toggleTheme}
      >
        <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" strokeWidth={2} />
        <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-500 dark:text-indigo-400" strokeWidth={2} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "w-full transition-all duration-300 h-10 flex items-center group relative rounded-lg cursor-pointer",
        isCollapsed ? "px-0 justify-center" : "px-3 justify-between",
        isDark ? "text-slate-400 hover:text-slate-100" : "text-slate-500 hover:text-slate-900"
      )}
      onClick={toggleTheme}
    >
      <div className="flex items-center z-10 relative">
        <div className="w-8 h-8 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/50 transition-all">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" strokeWidth={2.5} />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
        </div>
        <span className={cn(
          "transition-all duration-300 whitespace-nowrap overflow-hidden ml-3 text-[11px] font-bold tracking-tight",
          isCollapsed ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-[150px]"
        )}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </div>

      {!isCollapsed && (
        <div className="z-10 relative flex items-center scale-[0.8] origin-right">
          <Switch 
            checked={isDark} 
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "data-[state=checked]:bg-primary transition-colors border border-slate-200 dark:border-slate-800"
            )}
          />
        </div>
      )}
    </div>
  )
}
