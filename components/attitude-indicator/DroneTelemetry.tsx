// DroneTelemetry.tsx: the real-life AttitudeIndicator example.
// A drone's ground-station card: the attitude from the drone's last telemetry message, the manoeuvre it reports, and
// an alert when the bank goes past a safe limit. The buttons stand in for messages from the drone.
// Use this pattern for live telemetry: the instrument shows the angles, your own text and badge say what they mean.
import { AttitudeIndicator, Button, Card, Badge } from "march/ui"

// Manoeuvres the "drone" can report: a name and its attitude (degrees).
const MOVES = [
  { name: "Düz uçuş", pitch: 0, roll: 0 },
  { name: "Tırmanış", pitch: 12, roll: 0 },
  { name: "Sola dönüş", pitch: 3, roll: -25 },
  { name: "Sert sağ dönüş", pitch: -4, roll: 48 },
]

export function DroneTelemetry() {
  // The last telemetry message, as reactive state; each button "receives" one.
  let $move = MOVES[0]!
  const LIMIT = 40
  return <Card title="Drone · telemetri">
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* range={30}: 30° of pitch from the horizon to the rim, so small climbs show clearly. colors: the sky and
          ground as theme tokens; color: the aircraft symbol. The horizon springs to each message on the motion
          engine, so a jumpy feed still reads smoothly. */}
      <AttitudeIndicator pitch={$move.pitch} roll={$move.roll} range={30} size={210} label="Drone duruşu"
        colors={{ sky: "brand-blue", ground: "brand-green" }} color="warning" />
      <div sx={{ flex: "col", gap: 2 }}>
        <b>{$move.name}</b>
        {/* The limit in words and colour: the badge text says it, the colour only repeats it. */}
        <Badge tone={Math.abs($move.roll) > LIMIT ? "danger" : "success"}>
          {Math.abs($move.roll) > LIMIT ? `Yatış ${Math.abs($move.roll)}° · sınırın üstünde` : "Güvenli"}
        </Badge>
      </div>
    </div>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {MOVES.map((m) => <Button size="sm" variant="ghost" on:click={() => { $move = m }}>{m.name}</Button>)}
    </div>
  </Card>
}
