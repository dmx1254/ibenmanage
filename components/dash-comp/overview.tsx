"use client";

import { IbyGraph } from "@/lib/utils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const dataRandom = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 100) + 10,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 100) + 10,
  },
];

export function Overview({ data }: { data: IbyGraph[] }) {
  // console.log(data);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data || dataRandom}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-gray-50"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
