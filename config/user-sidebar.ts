import { 
  Home,
  FileText,
  Settings,
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
    groupLabel: "Career Toolkit",
    menus: [
      {
        href: "/dashboard/mock-mate",
        label: "Mock Mate",
        icon: FileText,
      },
      {
        href: "/dashboard/resume-perfect",
        label: "Resume Perfect",
        icon: FileText,
      },
      {
        href: "/dashboard/resume-eval",
        label: "Resume Eval",
        icon: FileText,
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