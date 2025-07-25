import React from "react";
import { Trash2, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Expense } from "@shared/expense";
import { getIconById } from "@shared/expense-icons";
import { formatCurrency } from "@/lib/expense-storage";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No expenses yet</p>
            <p className="text-sm">Add your first expense to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-3">
      {sortedExpenses.map((expense) => (
        <Card key={expense.id} className="w-full">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-foreground truncate">
                    {expense.description}
                  </h3>
                  {(() => {
                    const iconInfo = getIconById(expense.iconId);
                    const IconComponent = iconInfo?.icon;
                    return (
                      <>
                        {IconComponent && (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: iconInfo.color }}
                          >
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {iconInfo?.name || "Unknown"}
                        </Badge>
                      </>
                    );
                  })()}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-foreground">
                  {formatCurrency(expense.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
