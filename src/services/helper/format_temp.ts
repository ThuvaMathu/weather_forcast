export function formatTemperature(temperature: number, unit: string): string {
  const temperatureInCelsius =
    unit === "C" ? ((temperature - 32) * 5) / 9 : temperature;
  const unitSymbol = unit === "F" ? "°F" : "°C";
  return `${temperatureInCelsius?.toFixed(1)}${unitSymbol}`;
}
