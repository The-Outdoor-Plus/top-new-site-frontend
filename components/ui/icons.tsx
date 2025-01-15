import {
  Truck,
  Star,
  Settings,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  X,
  Check,
  type LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  truck: Truck,
  star: Star,
  settings: Settings,
  filter: Filter,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  search: Search,
  menu: Menu,
  x: X,
  check: Check,
} as const; 