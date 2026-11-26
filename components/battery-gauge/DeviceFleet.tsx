// DeviceFleet.tsx: the real-life BatteryGauge example.
// A warehouse's scanner fleet: every handheld scanner with its battery, the weakest first, and a count of the ones that
// need charging. The segmented look reads at a glance in a list; "Yeni tarama" stands in for the live feed.
// Use this pattern for device lists, IoT dashboards and fleets: one compact battery per row, sorted by need.
import { BatteryGauge, Button, Card, Badge } from "march/ui"

export function DeviceFleet() {
  // The fleet, as reactive state: a new array is assigned on each update, so the rows and the count follow.
  let $devices = [
    { id: "T-01", name: "Rampa 1", level: 82, charging: false },
    { id: "T-02", name: "Rampa 2", level: 17, charging: false },
    { id: "T-03", name: "Soğuk oda", level: 6, charging: true },
    { id: "T-04", name: "Sevkiyat", level: 45, charging: false },
  ]
  const sorted = () => [...$devices].sort((a, b) => a.level - b.level)
  const needy = () => $devices.filter((d) => d.level <= 20 && !d.charging).length
  // One scan per device: a scanner in use drains a little, one on the charger gains.
  const scan = () => { $devices = $devices.map((d) => ({ ...d, level: Math.max(0, Math.min(100, d.level + (d.charging ? 9 : -4))) })) }
  return <Card title="El terminalleri" actions={[<Badge tone={needy() ? "danger" : "success"}>{`${needy()} şarj bekliyor`}</Badge>]}>
    {sorted().map((d) => <div sx={{ flex: ["row", "center"], gap: 3 }}>
      {/* variant="segments": 5 cells, the last one lit by its share; readout="outside": the percentage beside the
          battery, easier to scan in a list. label gives each meter its device name, so a screen reader says
          "Rampa 2: 17%, low". Each fill springs to its new level on the motion engine when a scan arrives. */}
      <BatteryGauge value={d.level} charging={d.charging} variant="segments" segments={5} readout="outside" size={72} label={d.name} />
      <span>{`${d.id} · ${d.name}`}</span>
    </div>)}
    <Button size="sm" variant="ghost" on:click={scan}>Yeni tarama</Button>
  </Card>
}
