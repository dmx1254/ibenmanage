"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartDesktopType } from "@/lib/utils";

export const description = "An interactive pie chart";

const desktopDataTest = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "Janvier",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "Fevrier",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "Mars",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "Avril",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "Mai",
    color: "hsl(var(--chart-5))",
  },
  june: {
    label: "Juin",
    color: "hsl(243.4 75.4% 58.6%)",
  },
  july: {
    label: "Juillet",
    color: "hsl(40.6 96.1% 40.4%)",
  },
  august: {
    label: "Août",
    color: "hsl(262.1 83.3% 57.8%)",
  },
  september: {
    label: "September",
    color: "hsl(0 72.2% 50.6%)",
  },
  october: {
    label: "Octobre",
    color: "hsl(293.4 69.5% 48.8%)",
  },
  november: {
    label: "Novembre",
    color: "hsl(142.1 76.2% 36.3%)",
  },
  december: {
    label: "Decembre",
    color: "hsl(191.6 91.4% 36.5%)",
  },
} satisfies ChartConfig;

export function PieChartVisitors({
  desktopData,
}: {
  desktopData: ChartDesktopType[];
}) {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0]?.month);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item?.month === activeMonth),
    [activeMonth]
  );
  const months = React.useMemo(
    () => desktopData?.map((item) => item?.month),
    []
  );

  return (
    <Card
      data-chart={id}
      className="w-full flex flex-col max-h-[400px] lg:h-[400px] border-dark-500"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Nombre de visiteur</CardTitle>
          <CardDescription>Janvier - Decembre 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] border-dark-500 focus:outline-none focus:ring focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="rounded-xl border-dark-500 bg-dark-400"
          >
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-dark-400 border-dark-500"
                  hideLabel
                />
              }
            />
            <Pie
              data={desktopData || desktopDataTest}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                        >
                          {desktopData[activeIndex]?.desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white font-semibold"
                        >
                          Visiteurs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
