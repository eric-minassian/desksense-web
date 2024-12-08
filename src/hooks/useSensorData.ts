import { db } from "@/db";
import { sensorData, SensorData } from "@/db/schema";
import { desc } from "drizzle-orm";
import { useEffect, useState } from "react";

export function useSensorData(
  limit: number = 100,
  refreshInterval: number = 5000
) {
  const [data, setData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const result = await db
        .select()
        .from(sensorData)
        .orderBy(desc(sensorData.time))
        .limit(limit);
      setData(result.reverse());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalId);
  }, [limit, refreshInterval]);

  const mutate = () => {
    setIsLoading(true);
    fetchData();
  };

  return {
    data,
    isLoading,
    isError,
    mutate,
  };
}
