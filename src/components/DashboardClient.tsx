"use client";

import { getSensorData } from "@/app/actions/getSensorData";
import { HistoricalChart } from "@/components/HistoricalChart";
import { LatestReadings } from "@/components/LatestReadings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SensorData } from "@/db/schema";
import { useEffect, useState } from "react";

export function DashboardClient({
  initialData,
}: {
  initialData: SensorData[];
}) {
  const [data, setData] = useState(initialData);
  const [limit, setLimit] = useState(100);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getSensorData(limit);
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalId);
  }, [limit, refreshInterval]);

  const handleRefresh = async () => {
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
      <h1 className="text-3xl font-bold mb-6">Sensor Dashboard</h1>
      <div className="mb-6">
        <LatestReadings data={latestData} />
      </div>
      <div className="mb-6">
        <HistoricalChart data={data} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Label htmlFor="limit">Number of data points</Label>
          <Input
            id="limit"
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="refresh">Refresh interval (ms)</Label>
          <Input
            id="refresh"
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleRefresh}>Refresh Now</Button>
        </div>
      </div>
    </div>
  );
}
