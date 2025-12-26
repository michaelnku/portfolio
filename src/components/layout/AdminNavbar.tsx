"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, Settings, LogOut, User } from "lucide-react";
import { UserDTO } from "@/lib/types";
import { useLogout } from "@/hooks/useLogout";
import { useGetCurrentUserQuery } from "@/stores/useGetCurrentUserQuery";

export default function AdminNavbar({
  initialUser,
}: {
  initialUser: UserDTO | null;
}) {
  const logout = useLogout();
  const { data: user } = useGetCurrentUserQuery(initialUser);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* BRAND + CONTEXT */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://j1ruac0eqa.ufs.sh/f/3IGtMbPoM9Du0BUsAYCqwSbDInhZT2MBG1Xz9W6v0y4Ogfrc"
              alt="Michael Nku"
              width={34}
              height={34}
              className="rounded-md object-contain"
            />
            <span className="font-semibold text-lg tracking-tight">
              Michael Nku
            </span>
          </Link>

          <span className="hidden sm:inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-600">
            Admin
          </span>
        </div>

        {/* QUICK ACTIONS */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/projects"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Projects
          </Link>

          <Link
            href="/dashboard/messages"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Messages
          </Link>

          <Link
            href="/dashboard/analytics"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Analytics
          </Link>
        </nav>

        {/* ACCOUNT */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-muted transition">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}

              <span className="hidden md:block text-sm font-medium">
                {user?.name?.split(" ")[0] || "Admin"}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard/account" className="flex gap-2">
                <Settings className="w-4 h-4" />
                Account Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="flex gap-2 text-red-500 focus:text-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
