"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartTooltip, ChartTooltipContent } from "./ui/chart";

const chartData = [
  { name: "Jan", total: 123 },
  { name: "Feb", total: 234 },
  { name: "Mar", total: 156 },
  { name: "Apr", total: 312 },
  { name: "May", total: 289 },
  { name: "Jun", total: 345 },
  { name: "Jul", total: 412 },
];

export function UserSignupChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value}`} 
        />
        <Tooltip
            cursor={{fill: 'hsl(var(--muted))'}}
            content={<ChartTooltipContent />}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
