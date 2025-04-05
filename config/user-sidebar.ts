import { 
  ClipboardCheck,
  FileEdit,
  MessageSquare,
  User,
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
    groupLabel: "ResuBox",
    menus: [
      {
        href: "/dashboard/mock-mate",
        label: "Mock mate",
        icon: MessageSquare,
      },
      {
        href: "/dashboard/resume-refiner",
        label: "Resume Refiner",
        icon: FileEdit,
      },
      {
        href: "/dashboard/resume-analyzer",
        label: "Resume Analyzer",
        icon: ClipboardCheck,
      },

    ],
  },
  {
    groupLabel: "Account",
    menus: [
      {
        href: "/dashboard/profile", 
        label: "Profile",
        icon: User,
      },
    ],
  },
]; 