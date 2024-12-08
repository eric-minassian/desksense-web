import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData } from "@/db/schema";

export function LatestReadings({ data }: { data: SensorData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.temperature.toFixed(1)}°C
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.humidity.toFixed(1)}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Light</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.light.toFixed(1)} lux</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Noise Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.decibel.toFixed(1)} dB</div>
        </CardContent>
      </Card>
    </div>
  );
}
