// WorldClocks.tsx: the creative-minimal AnalogClock example.
// Three clocks for three cities, each in its own time zone, with one switch for the numerals of all of them.
// Use this pattern for a world-clock row, a team page that shows where colleagues are, or a travel app: the time zone
// is the only thing that differs between the clocks, so one array of cities drives the whole row.
import { AnalogClock, Card, Segmented } from "march/ui"

// The cities: an IANA time-zone name (what Intl understands) and the caption printed on the dial.
const CITIES = [
  { zone: "Europe/Istanbul", name: "İstanbul" },
  { zone: "Asia/Tokyo", name: "Tokyo" },
  { zone: "America/New_York", name: "New York" },
]

export function WorldClocks() {
  // One reactive choice shared by every clock: changing it re-labels all three dials at once.
  let $numerals = "arabic"
  return <Card title="Dünya saatleri">
    {/* Segmented: a few short choices, so a segmented control rather than a drop-down. bind:value writes $numerals. */}
    <Segmented aria-label="Rakamlar" bind:value={$numerals}
      options={[{ value: "arabic", label: "1–12" }, { value: "roman", label: "I–XII" }, { value: "quarters", label: "çeyrekler" }]} />
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* Each clock reads the system clock and shows it in its own timeZone; caption prints the city on the dial.
          The middle clock sweeps its second hand smoothly (seconds="smooth"), the others tick once a second on a small
          spring. Both run on the motion engine: with reduced motion in the OS the hands jump instead, and the clocks
          only tick while they are on screen. label is the accessible name: a screen reader hears "İstanbul: 3:45 PM",
          once a minute, never every second. */}
      {CITIES.map((c, i) => <AnalogClock timeZone={c.zone} caption={c.name} label={c.name} size={170}
        seconds={i === 1 ? "smooth" : "tick"} numerals={$numerals as "arabic" | "roman" | "quarters"} />)}
    </div>
  </Card>
}
