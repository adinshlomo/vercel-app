export interface Expense {
  id: string;
  description: string;
  amount: number;
  iconId: string;
  date: string;
  createdAt: string;
}

export interface ExpenseStats {
  total: number;
  todayTotal: number;
  thisWeekTotal: number;
  thisMonthTotal: number;
  iconTotals: Record<string, number>;
}
