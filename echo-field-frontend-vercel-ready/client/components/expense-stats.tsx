import React from "react";
import { TrendingUp, Calendar, DollarSign, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CategoryPieChart } from "./category-pie-chart";
import { ExpenseStats } from "@shared/expense";
import { formatCurrency } from "@/lib/expense-storage";

interface ExpenseStatsProps {
  stats: ExpenseStats;
}

export function ExpenseStatsDisplay({ stats }: ExpenseStatsProps) {
  const statCards = [
    {
      title: "Total Expenses",
      value: formatCurrency(stats.total),
      icon: DollarSign,
      description: "All time",
    },
    {
      title: "This Month",
      value: formatCurrency(stats.thisMonthTotal),
      icon: Calendar,
      description: "Current month",
    },
    {
      title: "This Week",
      value: formatCurrency(stats.thisWeekTotal),
      icon: TrendingUp,
      description: "Last 7 days",
    },
    {
      title: "Today",
      value: formatCurrency(stats.todayTotal),
      icon: PieChart,
      description: "Today's spending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Pie Chart at the top */}
      <CategoryPieChart stats={stats} />

      {/* Stats in 2x2 grid */}
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
