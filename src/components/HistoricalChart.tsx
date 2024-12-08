"use client";

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
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function HistoricalChart({ data }: { data: SensorData[] }) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Sensor Readings Over Time</CardTitle>
        <CardDescription>
          Historical data for temperature, humidity, light, and noise levels
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            temperature: {
              label: "Temperature",
              color: "hsl(var(--chart-1))",
            },
            humidity: {
              label: "Humidity",
              color: "hsl(var(--chart-2))",
            },
            light: {
              label: "Light",
              color: "hsl(var(--chart-3))",
            },
            decibel: {
              label: "Noise Level",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="time"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="var(--color-temperature)"
                name="Temperature (°C)"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="humidity"
                stroke="var(--color-humidity)"
                name="Humidity (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="light"
                stroke="var(--color-light)"
                name="Light (lux)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="decibel"
                stroke="var(--color-decibel)"
                name="Noise (dB)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
