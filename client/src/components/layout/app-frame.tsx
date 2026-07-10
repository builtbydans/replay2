"use client";

import {
  BotIcon,
  ClipboardCheckIcon,
  FileClockIcon,
  HeartPulseIcon,
  LayoutDashboardIcon,
  MoonIcon,
  SearchCheckIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const primaryNav = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Patient Queue",
    href: "/patients",
    icon: HeartPulseIcon,
  },
  {
    title: "Recommendations",
    href: "/recommendations",
    icon: ClipboardCheckIcon,
  },
  {
    title: "Decision Replays",
    href: "/replays",
    icon: FileClockIcon,
  },
];

const workflowLinks = [
  {
    title: "Active Encounter",
    href: "/encounters/enc-002",
    icon: SearchCheckIcon,
  },
  {
    title: "Consult Shell",
    href: "/patients/pat-001/consult",
    icon: BotIcon,
  },
];

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--replay-app-bg)] text-foreground">
      <header className="bg-[var(--replay-app-bg)]">
        <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-4 border-b border-slate-200/80 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm dark:bg-slate-100 dark:text-slate-950"
              aria-label="Replay overview"
            >
              <SparklesIcon className="size-4" />
            </Link>
            <div className="min-w-0">
              <p className="text-lg font-semibold leading-none text-slate-950 dark:text-slate-50">
                Replay
              </p>
              <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                AI-assisted clinical workflow
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground 2xl:flex">
            <div>
              <span className="font-medium text-foreground">Consultant</span>
              <p>Demo clinician</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Department</span>
              <p>Emergency Medicine</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Shift</span>
              <p>Day Shift</p>
            </div>
          </div>

          <nav
            aria-label="Primary workflows"
            className="grid auto-cols-max grid-flow-col gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                    active &&
                      "bg-slate-950 text-white shadow-sm dark:bg-slate-100 dark:text-slate-950",
                    !active &&
                      "text-slate-500 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 xl:flex">
              {workflowLinks.map((item) => (
                <Button key={item.href} asChild variant="outline" size="sm">
                  <Link href={item.href}>
                    <item.icon />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle colour theme"
                >
                  <SunIcon className="absolute size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
