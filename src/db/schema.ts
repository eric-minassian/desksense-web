import { integer, pgTable, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const sensorData = pgTable("sensorData", {
  time: timestamp().primaryKey().defaultNow(),
  temperature: real().notNull(),
  humidity: real().notNull(),
  light: real().notNull(),
  decibel: real().notNull(),
  eCO2: integer().notNull(),
  TVOC: integer().notNull(),
  rawH2: integer().notNull(),
  rawEthanol: integer().notNull(),
});

export const insertSensorDataSchema = createInsertSchema(sensorData);
