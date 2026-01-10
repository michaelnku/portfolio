"use client";

import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Settings, LogOut, User2Icon } from "lucide-react";
import { AboutUI, UserDTO } from "@/lib/types";
import { useLogout } from "@/hooks/useLogout";
import { useGetCurrentUserQuery } from "@/stores/useGetCurrentUserQuery";
import { Button } from "@/components/ui/button";
import { ADMIN_NAV } from "@/lib/admin-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  initialUser: UserDTO | null;
  about: AboutUI | null;
};

export default function AdminNavbar({ initialUser, about }: Props) {
  const logout = useLogout();
  const { data: user } = useGetCurrentUserQuery(initialUser);

  const avatar = user?.profileImage?.url ?? user?.image ?? null;

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* LEFT: BRAND + MOBILE MENU */}
        <div className="flex items-center gap-3">
          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Admin Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-2">
                {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                      pathname === href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://j1ruac0eqa.ufs.sh/f/3IGtMbPoM9Du0BUsAYCqwSbDInhZT2MBG1Xz9W6v0y4Ogfrc"
              alt="Michael Nku"
              width={34}
              height={34}
              className="rounded-md object-contain"
            />
            <span className="font-semibold text-lg tracking-tight">
              {about?.fullName ?? "Admin"}
            </span>
          </Link>

          {/* ADMIN BADGE */}
          <span className="hidden sm:inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-600">
            {user?.role}
          </span>
        </div>

        {/* RIGHT: ACCOUNT MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-muted transition">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 uppercase rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                  {user?.name?.[0] ?? user?.email[0]}
                </div>
              )}

              <span className="hidden md:block text-sm font-medium">
                {user?.name?.split(" ")[0] || user?.username || "Admin"}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">
                {user?.name || user?.username}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex gap-2">
                <User2Icon className="w-4 h-4" />
                My Profile
              </Link>
            </DropdownMenuItem>
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
