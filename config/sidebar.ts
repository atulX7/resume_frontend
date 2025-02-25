import { 
  LayoutDashboard, 
  Users, 
  FileText,
  MessageSquare,
  User
} from "lucide-react"
import { LucideIcon } from "lucide-react"

// Type definition for menu items
interface MenuItem {
  groupLabel?: string
  menus?: {
    href: string
    label: string
    icon: LucideIcon
    active?: boolean
  }[]
}

// Export the menu items array
export const menuItems: MenuItem[] = [
  {
    groupLabel: "Main",
    menus: [
      {
        label: "Dashboard",
        href: "/admin/dashboard/mock-mate",
        icon: LayoutDashboard
      },
      {
        label: "Users",
        href: "/admin/users",
        icon: Users
      }
    ]
  },
  {
    groupLabel: "Management",
    menus: [
      {
        label: "Documents",
        href: "/admin/documents",
        icon: FileText
      },
      {
        label: "Messages",
        href: "/admin/messages",
        icon: MessageSquare
      },
      {
        label: "Profile",
        href: "/admin/profile",
        icon: User  
      }
    ]
  }
] 