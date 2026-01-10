import {
  LayoutDashboard,
  User2,
  Phone,
  FolderKanban,
  Mail,
  BarChart3,
} from "lucide-react";

export const ADMIN_NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "About",
    href: "/dashboard/about",
    icon: User2,
  },
  {
    label: "Contact",
    href: "/dashboard/contact",
    icon: Phone,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: Mail,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];
