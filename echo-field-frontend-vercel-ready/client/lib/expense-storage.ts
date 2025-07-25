import { Expense, ExpenseStats } from "@shared/expense";

const STORAGE_KEY = "expense-tracker-data";

export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Failed to save expenses:", error);
  }
}

export function loadExpenses(): Expense[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load expenses:", error);
    return [];
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function calculateStats(expenses: Expense[]): ExpenseStats {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const weekStart = startOfWeek.toISOString().split("T")[0];

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthStart = startOfMonth.toISOString().split("T")[0];

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const todayTotal = expenses
    .filter((expense) => expense.date === today)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const thisWeekTotal = expenses
    .filter((expense) => expense.date >= weekStart)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const thisMonthTotal = expenses
    .filter((expense) => expense.date >= monthStart)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const iconTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.iconId] = (acc[expense.iconId] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    total,
    todayTotal,
    thisWeekTotal,
    thisMonthTotal,
    iconTotals,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
