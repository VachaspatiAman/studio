"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";

const chartData = [
  { name: "Jan", total: 123 },
  { name: "Feb", total: 234 },
  { name: "Mar", total: 156 },
  { name: "Apr", total: 312 },
  { name: "May", total: 289 },
  { name: "Jun", total: 345 },
  { name: "Jul", total: 412 },
];

const chartConfig = {
  total: {
    label: "Sign-ups",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function UserSignupChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[350px]">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
            cursor={{fill: 'hsl(var(--muted))'}}
            content={<ChartTooltipContent />}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
