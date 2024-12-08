import { db } from "@/db";
import { insertSensorDataSchema, sensorData } from "@/db/schema";
import { env } from "@/env";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== env.API_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  const validatedData = insertSensorDataSchema.safeParse(body);

  if (!validatedData.success) {
    return new Response("Bad Request", { status: 400 });
  }

  await db.insert(sensorData).values({
    ...validatedData.data,
  });

  return new Response("OK", { status: 200 });
}
