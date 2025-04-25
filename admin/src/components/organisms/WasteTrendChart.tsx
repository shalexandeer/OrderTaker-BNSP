"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Sample data for different time ranges
const timeRangeData = {
  "3months": [
    { month: "Apr", sampahMasuk: 85, sampahTerolah: 70, sampahKeluar: 60 },
    { month: "Mei", sampahMasuk: 55, sampahTerolah: 45, sampahKeluar: 40 },
    { month: "Jun", sampahMasuk: 54, sampahTerolah: 48, sampahKeluar: 42 },
  ],
  "6months": [
    { month: "Jan", sampahMasuk: 65, sampahTerolah: 55, sampahKeluar: 50 },
    { month: "Feb", sampahMasuk: 58, sampahTerolah: 50, sampahKeluar: 45 },
    { month: "Mar", sampahMasuk: 80, sampahTerolah: 70, sampahKeluar: 65 },
    { month: "Apr", sampahMasuk: 85, sampahTerolah: 70, sampahKeluar: 60 },
    { month: "Mei", sampahMasuk: 55, sampahTerolah: 45, sampahKeluar: 40 },
    { month: "Jun", sampahMasuk: 54, sampahTerolah: 48, sampahKeluar: 42 },
  ],
  "1year": [
    { month: "Jan", sampahMasuk: 65, sampahTerolah: 55, sampahKeluar: 50 },
    { month: "Feb", sampahMasuk: 58, sampahTerolah: 50, sampahKeluar: 45 },
    { month: "Mar", sampahMasuk: 80, sampahTerolah: 70, sampahKeluar: 65 },
    { month: "Apr", sampahMasuk: 85, sampahTerolah: 70, sampahKeluar: 60 },
    { month: "Mei", sampahMasuk: 55, sampahTerolah: 45, sampahKeluar: 40 },
    { month: "Jun", sampahMasuk: 54, sampahTerolah: 48, sampahKeluar: 42 },
    { month: "Jul", sampahMasuk: 40, sampahTerolah: 35, sampahKeluar: 30 },
    { month: "Agu", sampahMasuk: 60, sampahTerolah: 50, sampahKeluar: 45 },
    { month: "Sep", sampahMasuk: 70, sampahTerolah: 60, sampahKeluar: 55 },
    { month: "Okt", sampahMasuk: 75, sampahTerolah: 65, sampahKeluar: 60 },
    { month: "Nov", sampahMasuk: 68, sampahTerolah: 58, sampahKeluar: 52 },
    { month: "Des", sampahMasuk: 72, sampahTerolah: 62, sampahKeluar: 58 },
  ],
  "3years": [
    {
      month: "2022-S1",
      sampahMasuk: 350,
      sampahTerolah: 300,
      sampahKeluar: 280,
    },
    {
      month: "2022-S2",
      sampahMasuk: 380,
      sampahTerolah: 330,
      sampahKeluar: 310,
    },
    {
      month: "2023-S1",
      sampahMasuk: 420,
      sampahTerolah: 370,
      sampahKeluar: 350,
    },
    {
      month: "2023-S2",
      sampahMasuk: 450,
      sampahTerolah: 400,
      sampahKeluar: 380,
    },
    {
      month: "2024-S1",
      sampahMasuk: 480,
      sampahTerolah: 430,
      sampahKeluar: 410,
    },
    {
      month: "2024-S2",
      sampahMasuk: 500,
      sampahTerolah: 450,
      sampahKeluar: 430,
    },
  ],
};

type TimeRange = "3months" | "6months" | "1year" | "3years";

const timeRangeLabels: Record<TimeRange, string> = {
  "3months": "3 Bulan Terakhir",
  "6months": "6 Bulan Terakhir",
  "1year": "1 Tahun Terakhir",
  "3years": "3 Tahun Terakhir",
};

export function WasteTrendChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("6months");
  const data = timeRangeData[timeRange];

  return (
    <Card className="w-full border-none p-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Trend Sampah TPS</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8">
              {timeRangeLabels[timeRange]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(timeRangeLabels).map(([key, label]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setTimeRange(key as TimeRange)}
                className={cn(timeRange === key && "font-bold")}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sampahMasuk: {
              label: "Sampah Masuk",
              color: "hsl(210 80% 60%)", // Blue color
            },
            sampahTerolah: {
              label: "Sampah Terolah",
              color: "hsl(175 70% 50%)", // Teal color
            },
            sampahKeluar: {
              label: "Sampah Keluar",
              color: "hsl(25 100% 60%)", // Orange color
            },
          }}
          className="aspect-[4/3] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
              barGap={2}
              barSize={timeRange === "3years" ? 30 : 20}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                fontSize={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                fontSize={12}
              />
              <Tooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [`${value} ton `, name]}
                    labelFormatter={(label) => `Periode: ${label}`}
                  />
                }
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => {
                  const labels = {
                    sampahMasuk: "Sampah Masuk",
                    sampahTerolah: "Sampah Terolah",
                    sampahKeluar: "Sampah Keluar",
                  };
                  return labels[value as keyof typeof labels] || value;
                }}
              />
              <Bar
                dataKey="sampahMasuk"
                fill="var(--color-sampahMasuk)"
                radius={[4, 4, 0, 0]}
                name="Sampah Masuk"
              />
              <Bar
                dataKey="sampahTerolah"
                fill="var(--color-sampahTerolah)"
                radius={[4, 4, 0, 0]}
                name="Sampah Terolah"
              />
              <Bar
                dataKey="sampahKeluar"
                fill="var(--color-sampahKeluar)"
                radius={[4, 4, 0, 0]}
                name="Sampah Keluar"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
