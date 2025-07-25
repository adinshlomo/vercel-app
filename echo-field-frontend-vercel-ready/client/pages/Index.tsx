import React, { useState, useEffect } from "react";
import { Wallet, Moon, Sun } from "lucide-react";
import { ExpenseFormModal } from "../components/expense-form-modal";
import { ExpenseList } from "../components/expense-list";
import { ExpenseStatsDisplay } from "../components/expense-stats";
import { ExpenseFilter } from "../components/expense-filter";
import { Button } from "../components/ui/button";
import { Expense } from "@shared/expense";
import {
  loadExpenses,
  saveExpenses,
  calculateStats,
} from "@/lib/expense-storage";

export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  useEffect(() => {
    const savedExpenses = loadExpenses();
    setExpenses(savedExpenses);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleAddExpense = (expense: Expense) => {
    const updatedExpenses = [expense, ...expenses];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const filteredExpenses = selectedIconId
    ? expenses.filter((expense) => expense.iconId === selectedIconId)
    : expenses;

  const stats = calculateStats(expenses);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                ExpenseTracker
              </h1>
              <p className="text-sm text-muted-foreground">
                Keep track of your spending
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 p-0"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </header>

        {/* Stats with Pie Chart */}
        <div className="mb-8">
          <ExpenseStatsDisplay stats={stats} />
        </div>

        {/* Add Expense Button */}
        <div className="mb-8">
          <ExpenseFormModal onAddExpense={handleAddExpense} />
        </div>

        {/* Expense List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Expenses
            </h2>
            {expenses.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {filteredExpenses.length} of {expenses.length} expense
                {expenses.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {expenses.length > 0 && (
            <ExpenseFilter
              selectedIconId={selectedIconId}
              onIconChange={setSelectedIconId}
            />
          )}

          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </div>
    </div>
  );
}
