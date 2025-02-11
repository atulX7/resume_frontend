import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  type LucideIcon,
} from "lucide-react"

export interface MenuItem {
  title: string
  href: string
  icon: LucideIcon
}

export function getMenuList(): MenuItem[] {
  return [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]
} 