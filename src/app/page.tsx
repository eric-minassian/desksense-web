import { db } from "@/db";
import { sensorData } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allSensorData = await db.select().from(sensorData);

  return (
    <main>
      <h1>DeskSense</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Light</th>
            <th>Decibel</th>
            <th>eCO2</th>
            <th>TVOC</th>
            <th>Raw H2</th>
            <th>Raw Ethanol</th>
          </tr>
        </thead>
        <tbody>
          {allSensorData.map((row, i) => (
            <tr key={i}>
              <td>{row.time.toLocaleDateString()}</td>
              <td>{row.temperature}</td>
              <td>{row.humidity}</td>
              <td>{row.light}</td>
              <td>{row.decibel}</td>
              <td>{row.eCO2}</td>
              <td>{row.TVOC}</td>
              <td>{row.rawH2}</td>
              <td>{row.rawEthanol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
