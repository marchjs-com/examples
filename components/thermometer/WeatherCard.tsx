// WeatherCard.tsx: the real-life Thermometer example.
// A weather card: pick a city, see its temperature on a thermometer, and switch between °C and °F. The other unit is
// shown as a second scale on the other side of the tube, so visitors from either system can read it.
// Use this pattern when your users mix unit systems: keep your data in one unit (°C) and let `unit` and `secondary`
// do the converting.
import { Thermometer, Segmented, Card } from "march/ui"

// Today's readings in °C (a real app would load them from a weather API).
const CITIES = [
  { id: "erzurum", name: "Erzurum", temp: -12 },
  { id: "istanbul", name: "İstanbul", temp: 9 },
  { id: "antalya", name: "Antalya", temp: 21 },
  { id: "dubai", name: "Dubai", temp: 34 },
]

export function WeatherCard() {
  let $city = "istanbul"
  let $unit = "C"
  const city = () => CITIES.find((c) => c.id === $city)!
  return <Card title="Hava durumu">
    {/* Few short choices: Segmented controls, not drop-downs. */}
    <Segmented aria-label="Şehir" bind:value={$city} options={CITIES.map((c) => ({ value: c.id, label: c.name }))} />
    <Segmented aria-label="Birim" size="sm" bind:value={$unit} options={[{ value: "C", label: "°C" }, { value: "F", label: "°F" }]} />
    {/* unit: the main scale, the readout and the spoken value in °C or °F, with round ticks in that unit.
        secondary: the other unit's scale on the other side. zones in °C: freezing, mild, hot. Changing the city
        springs the column to the new temperature (motion engine; instant with reduced motion). label names the
        meter for screen readers. */}
    <Thermometer value={city().temp} unit={$unit as "C" | "F"} secondary min={-20} max={45} label={`${city().name} sıcaklığı`}
      zones={[{ from: -20, to: 0, color: "info" }, { from: 15, to: 25, color: "success" }, { from: 30, to: 45, color: "danger" }]} />
  </Card>
}
