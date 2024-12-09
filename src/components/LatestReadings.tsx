import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData } from "@/db/schema";
import { THRESHOLDS } from "@/lib/config";

function getColorClass(
  value: number,
  yellowThreshold: number,
  redThreshold: number
) {
  if (value >= redThreshold) return "bg-red-100 dark:bg-red-900/20";
  if (value >= yellowThreshold) return "bg-yellow-100 dark:bg-yellow-900/20";
  return "";
}

export function LatestReadings({ data }: { data: SensorData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        className={getColorClass(
          data.temperature,
          THRESHOLDS.temperature.yellow,
          THRESHOLDS.temperature.red
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.temperature.toFixed(1)}°C
          </div>
        </CardContent>
      </Card>
      <Card
        className={getColorClass(
          data.humidity,
          THRESHOLDS.humidity.yellow,
          THRESHOLDS.humidity.red
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.humidity.toFixed(1)}%</div>
        </CardContent>
      </Card>
      <Card
        className={getColorClass(
          data.light,
          THRESHOLDS.light.yellow,
          THRESHOLDS.light.red
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Light</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.light.toFixed(1)} lux</div>
        </CardContent>
      </Card>
      <Card
        className={getColorClass(
          data.decibel,
          THRESHOLDS.noise.yellow,
          THRESHOLDS.noise.red
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Noise Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.decibel.toFixed(1)} dB</div>
        </CardContent>
      </Card>
      <Card
        className={getColorClass(
          data.eCO2,
          THRESHOLDS.eco2.yellow,
          THRESHOLDS.eco2.red
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">eCO2</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.eCO2} ppm</div>
        </CardContent>
      </Card>
      <Card
        className={getColorClass(
          data.TVOC,
          THRESHOLDS.tvoc.yellow,
          THRESHOLDS.tvoc.red
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TVOC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.TVOC} ppb</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Raw H2</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.rawH2}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Raw Ethanol</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.rawEthanol}</div>
        </CardContent>
      </Card>
    </div>
  );
}
