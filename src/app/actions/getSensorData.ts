"use server";

import { db } from "@/db";
import { sensorData, SensorData } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getSensorData(
  limit: number = 100
): Promise<SensorData[]> {
  try {
    const result = await db
      .select()
      .from(sensorData)
      .orderBy(desc(sensorData.time))
      .limit(limit);
    return result.reverse();
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw new Error("Failed to fetch sensor data");
  }
}
