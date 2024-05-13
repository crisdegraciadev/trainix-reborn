"use client";

import { ThemeToggle } from "@components/theme-toggle";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { AppRoutes } from "@constants/routes";
import { cn } from "@lib/utils";
import { Dumbbell, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TABS = ["dashboard", "exercises", "workouts"] as const;

type _ = {
  user: Partial<{ name: string; email: string }>;
};

function MobileNavbar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 mt-8">
            <nav className="flex flex-col items-center gap-6 text-xl">
              <Link
                href={AppRoutes.WORKOUTS}
                className={cn(
                  "transition-colors hover:text-primary",
                  !pathname.includes(TABS[2]) ? "text-muted-foreground" : "",
                )}
              >
                Workouts
              </Link>
              <Link
                href={AppRoutes.EXERCISES}
                className={cn(
                  "transition-colors hover:text-primary",
                  !pathname.includes(TABS[1]) ? "text-muted-foreground" : "",
                )}
              >
                Exercises
              </Link>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Topbar({ user }: _) {
  const pathname = usePathname();

  return (
    <div className="flex h-14 top-0 fixed w-full justify-between px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 2xl:px-48 items-center border-b">
      <div className="flex">
        <div className="flex items-center gap-1 mr-6">
          <Dumbbell className="w-5 h-5" />
          <span className="font-bold">Trainix</span>
        </div>
        <nav className="items-center gap-6 hidden md:flex">
          <Link
            href={AppRoutes.WORKOUTS}
            className={cn(
              "text-sm transition-colors hover:text-primary",
              !pathname.includes(TABS[2]) ? "text-muted-foreground" : "",
            )}
          >
            Workouts
          </Link>
          <Link
            href={AppRoutes.EXERCISES}
            className={cn(
              "text-sm transition-colors hover:text-primary",
              !pathname.includes(TABS[1]) ? "text-muted-foreground" : "",
            )}
          >
            Exercises
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <MobileNavbar />
      </div>
    </div>
  );
}
