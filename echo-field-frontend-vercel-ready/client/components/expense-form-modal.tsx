import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ExpenseForm } from "./expense-form";
import { Expense } from "@shared/expense";

interface ExpenseFormModalProps {
  onAddExpense: (expense: Expense) => void;
}

export function ExpenseFormModal({ onAddExpense }: ExpenseFormModalProps) {
  const [open, setOpen] = useState(false);

  const handleAddExpense = (expense: Expense) => {
    onAddExpense(expense);
    setOpen(false); // Close modal after adding expense
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          <Plus className="w-5 h-5 mr-2" />
          Add New Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
