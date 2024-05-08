"use client";

import { ThemeToggle } from "@components/theme-toggle";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { AppRoutes } from "@constants/routes";
import { cn } from "@lib/utils";
import { Dumbbell } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TABS = ["dashboard", "exercises", "workouts"] as const;

type _ = {
  user: Partial<{ name: string; email: string }>;
};

export default function Topbar({ user }: _) {
  const pathname = usePathname();

  return (
    <div className="flex h-14 top-0 fixed w-full justify-between px-48 items-center border-b">
      <div className="flex">
        <div className="flex items-center gap-1 mr-6">
          <Dumbbell className="w-5 h-5" />
          <span className="font-bold">Trainix</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
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
                {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
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
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </div>
  );
}
