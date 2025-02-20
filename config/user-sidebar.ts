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
    groupLabel: "Resume",
    menus: [
      {
        href: "/dashboard/mock-interview",
        label: "Mock Interview",
        icon: FileText,
      },
      {
        href: "/dashboard/tailor-resume",
        label: "Tailor Resume",
        icon: FileText,
      },
      {
        href: "/dashboard/resume-ATS",
        label: "Resume ATS",
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