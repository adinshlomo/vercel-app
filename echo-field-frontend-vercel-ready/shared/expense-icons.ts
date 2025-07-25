import {
  Utensils,
  Car,
  ShoppingBag,
  Gamepad2,
  Zap,
  Heart,
  Plane,
  GraduationCap,
  Sparkles,
  Coffee,
  Home,
  Dumbbell,
  Music,
  Camera,
  Shirt,
  Gift,
} from "lucide-react";

export interface ExpenseIcon {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export const EXPENSE_ICONS: ExpenseIcon[] = [
  {
    id: "food",
    name: "Food & Dining",
    icon: Utensils,
    color: "#b4e0d4",
  },
  {
    id: "transport",
    name: "Transportation",
    icon: Car,
    color: "#3b82f6",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: ShoppingBag,
    color: "#f59e0b",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: Gamepad2,
    color: "#ef4444",
  },
  {
    id: "utilities",
    name: "Bills & Utilities",
    icon: Zap,
    color: "#8b5cf6",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Heart,
    color: "#f97316",
  },
  {
    id: "travel",
    name: "Travel",
    icon: Plane,
    color: "#06b6d4",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    color: "#84cc16",
  },
  {
    id: "personal",
    name: "Personal Care",
    icon: Sparkles,
    color: "#ec4899",
  },
  {
    id: "coffee",
    name: "Coffee & Drinks",
    icon: Coffee,
    color: "#6b7280",
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: Home,
    color: "#10b981",
  },
  {
    id: "fitness",
    name: "Fitness & Sports",
    icon: Dumbbell,
    color: "#f43f5e",
  },
  {
    id: "music",
    name: "Music & Audio",
    icon: Music,
    color: "#8b5cf6",
  },
  {
    id: "photography",
    name: "Photography",
    icon: Camera,
    color: "#06b6d4",
  },
  {
    id: "clothing",
    name: "Clothing",
    icon: Shirt,
    color: "#f59e0b",
  },
  {
    id: "gifts",
    name: "Gifts",
    icon: Gift,
    color: "#ef4444",
  },
];

export function getIconById(id: string): ExpenseIcon | undefined {
  return EXPENSE_ICONS.find((icon) => icon.id === id);
}

export function getIconColor(iconId: string): string {
  const icon = getIconById(iconId);
  return icon?.color || "#6b7280";
}
