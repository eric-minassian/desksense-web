"use client";

import { getSensorData } from "@/app/actions/getSensorData";
import { LatestReadings } from "@/components/LatestReadings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SensorData } from "@/db/schema";
import { useEffect, useState } from "react";
import { LineChartDots } from "./LineChartDots";

export function DashboardClient({
  initialData,
}: {
  initialData: SensorData[];
}) {
  const [data, setData] = useState(initialData);
  const [limit, setLimit] = useState(50);
  const [refreshInterval, setRefreshInterval] = useState(15); // 15 seconds default
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getSensorData(limit);
        setData(newData);
        setProgress(0); // Reset progress after refresh
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, refreshInterval * 1000);

    // Progress bar update
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 100 / (refreshInterval * 10);
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
      clearInterval(progressInterval);
    };
  }, [limit, refreshInterval]);

  const handleRefresh = async () => {
    setProgress(0);
    try {
      const newData = await getSensorData(limit);
      setData(newData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const latestData = data[data.length - 1];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Sensor Dashboard
        </h1>
        <div className="flex flex-col w-full md:w-auto gap-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <Label htmlFor="limit">Data Points</Label>
              <Input
                id="limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-[120px]"
              />
            </div>
            <div>
              <Label htmlFor="refresh">Refresh (seconds)</Label>
              <Input
                id="refresh"
                type="number"
                min="1"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="w-[120px]"
              />
            </div>
            <Button onClick={handleRefresh}>Refresh Now</Button>
          </div>
          <Progress value={progress} className="h-2 w-full" />
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Live Readings</h2>
          <LatestReadings data={latestData} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Historical Data</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <LineChartDots
              data={data}
              dataKey="temperature"
              title="Temperature"
              description=""
              label="Temperature (°C)"
              color="--chart-1"
            />
            <LineChartDots
              data={data}
              dataKey="humidity"
              title="Humidity"
              description=""
              label="Humidity (%)"
              color="--chart-2"
            />
            <LineChartDots
              data={data}
              dataKey="eCO2"
              title="eCO2"
              description=""
              label="eCO2 (ppm)"
              color="--chart-3"
            />
            <LineChartDots
              data={data}
              dataKey="TVOC"
              title="TVOC"
              description=""
              label="TVOC (ppb)"
              color="--chart-4"
            />
            <LineChartDots
              data={data}
              dataKey="light"
              title="Light"
              description=""
              label="Light (lux)"
              color="--chart-5"
            />
            <LineChartDots
              data={data}
              dataKey="decibel"
              title="Decibel"
              description=""
              label="Decibel (dB)"
              color="--chart-1"
            />
            <LineChartDots
              data={data}
              dataKey="rawH2"
              title="Raw H2"
              description=""
              label="Raw H2"
              color="--chart-2"
            />
            <LineChartDots
              data={data}
              dataKey="rawEthanol"
              title="Raw Ethanol"
              description=""
              label="Raw Ethanol"
              color="--chart-3"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
