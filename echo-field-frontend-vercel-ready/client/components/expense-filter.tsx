import React from "react";
import { Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { EXPENSE_ICONS, getIconById } from "@shared/expense-icons";

interface ExpenseFilterProps {
  selectedIconId: string | null;
  onIconChange: (iconId: string | null) => void;
}

export function ExpenseFilter({
  selectedIconId,
  onIconChange,
}: ExpenseFilterProps) {
  const selectedIcon = selectedIconId ? getIconById(selectedIconId) : null;

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>Filter by category:</span>
      </div>

      <Select
        value={selectedIconId || "all"}
        onValueChange={(value) => onIconChange(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {EXPENSE_ICONS.map((icon) => {
            const IconComponent = icon.icon;
            return (
              <SelectItem key={icon.id} value={icon.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: icon.color }}
                  >
                    <IconComponent className="w-2 h-2 text-white" />
                  </div>
                  {icon.name}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {selectedIcon && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <div
            className="w-3 h-3 rounded-full flex items-center justify-center"
            style={{ backgroundColor: selectedIcon.color }}
          >
            <selectedIcon.icon className="w-1.5 h-1.5 text-white" />
          </div>
          {selectedIcon.name}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onIconChange(null)}
            className="h-auto p-0 ml-1 hover:bg-transparent"
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      )}
    </div>
  );
}
