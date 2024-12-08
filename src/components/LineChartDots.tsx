"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SensorData } from "@/db/schema";

interface LineChartDotsProps {
  data: SensorData[];
  dataKey: keyof SensorData;
  title: string;
  description: string;
  label: string;
  color?: "--chart-1" | "--chart-2" | "--chart-3" | "--chart-4" | "--chart-5";
}

export function LineChartDots({
  data,
  dataKey,
  title,
  description,
  label,
  color = "--chart-1",
}: LineChartDotsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[200px]"
          config={{
            main: {
              label: label,
              color: `hsl(var(${color}))`,
            },
          }}
        >
          <LineChart accessibilityLayer data={data}>
            <XAxis
              dataKey="time"
              tickFormatter={(time) => new Date(time).toLocaleTimeString()}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="var(--color-main)"
              name={label}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
