import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { EXPENSE_ICONS, ExpenseIcon } from "@shared/expense-icons";
import { cn } from "@/lib/utils";

interface IconSelectorProps {
  selectedIconId: string;
  onIconSelect: (iconId: string) => void;
}

export function IconSelector({
  selectedIconId,
  onIconSelect,
}: IconSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Category Icon</Label>
      <div
        className="max-h-48 overflow-y-auto m-3 p-0.5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 44px)",
          gap: "8px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {EXPENSE_ICONS.map((iconItem: ExpenseIcon) => {
          const IconComponent = iconItem.icon;
          const isSelected = selectedIconId === iconItem.id;

          return (
            <Button
              key={iconItem.id}
              type="button"
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onIconSelect(iconItem.id)}
              className={cn(
                "w-11 h-11 p-0 rounded-lg flex-shrink-0",
                isSelected && "ring-2 ring-primary",
              )}
            >
              <IconComponent className="w-5 h-5" />
            </Button>
          );
        })}
      </div>

      {selectedIconId && (
        <div className="text-sm text-muted-foreground mt-2">
          Selected:{" "}
          {EXPENSE_ICONS.find((icon) => icon.id === selectedIconId)?.name}
        </div>
      )}
    </div>
  );
}
