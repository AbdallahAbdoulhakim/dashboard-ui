"use client";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 2330,
    expense: 2050,
  },
  {
    name: "Feb",
    income: 2690,
    expense: 5930,
  },
  {
    name: "Mar",
    income: 2210,
    expense: 2930,
  },
  {
    name: "Apr",
    income: 2440,
    expense: 3280,
  },
  {
    name: "May",
    income: 2010,
    expense: 2080,
  },
  {
    name: "Jun",
    income: 3070,
    expense: 3320,
  },
  {
    name: "Jul",
    income: 2820,
    expense: 1750,
  },
  {
    name: "Aug",
    income: 3950,
    expense: 8680,
  },
  {
    name: "Sep",
    income: 2610,
    expense: 8610,
  },
  {
    name: "Oct",
    income: 3810,
    expense: 4660,
  },
  {
    name: "Nov",
    income: 3530,
    expense: 1570,
  },
  {
    name: "Dec",
    income: 3620,
    expense: 3760,
  },
];

export default function FinanceChart() {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      {/* CHART */}
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#FAE27C"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#C3EBFA"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
