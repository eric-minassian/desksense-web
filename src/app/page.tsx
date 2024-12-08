import { DashboardClient } from "@/components/DashboardClient";
import { getSensorData } from "./actions/getSensorData";

export default async function Home() {
  const initialData = await getSensorData(100);

  return <DashboardClient initialData={initialData} />;
}
