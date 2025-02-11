import { 
  Home,
  FileText,
  Settings,
  MessageSquare,
  type LucideIcon 
} from "lucide-react";

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

interface MenuGroup {
  groupLabel?: string;
  menus: MenuItem[];
}

export const userMenuItems: MenuGroup[] = [
  {
    menus: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: Home,
      },
    ],
  },
  {
    groupLabel: "Resume",
    menus: [
      {
        href: "/dashboard/resumes",
        label: "My Resumes",
        icon: FileText,
      },
      {
        href: "/dashboard/feedback",
        label: "Feedback",
        icon: MessageSquare,
      },
    ],
  },
  {
    groupLabel: "Account",
    menus: [
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
]; 