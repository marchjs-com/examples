import { SplitFlap, Button, Card } from "march/ui"

// Departures: the real-life SplitFlap example.
// An airport departure board: one row per flight with its time, destination, gate and status, each field its own
// SplitFlap. The update button changes a few flights at random, and only the cells whose character changed flip,
// which is what makes a real board readable from across a hall. Use this pattern for any timetable or status wall:
// trains, ferries, a support queue, a factory's shift board.

// One flight. In an app the rows would come from a query or a channel; the boards only follow the values.
interface Flight { time: string; city: string; gate: string; status: string }
const CITIES = ["ANKARA", "İZMİR", "BERLİN", "LONDRA", "BAKÜ", "TRABZON", "ROMA"]
const STATUS = ["ZAMANINDA", "BİNİŞ", "GECİKMELİ", "KAPI KAPANDI"]

export function Departures() {
  let $flights: Flight[] = [
    { time: "14:05", city: "ANKARA", gate: "A4", status: "ZAMANINDA" },
    { time: "14:20", city: "BERLİN", gate: "B12", status: "BİNİŞ" },
    { time: "14:45", city: "İZMİR", gate: "A7", status: "GECİKMELİ" },
  ]
  // Pick a random item of a list.
  const any = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)]!
  // Change the status of every flight and send one of them to a new city and gate, as a real board update would.
  const update = () => {
    const k = Math.floor(Math.random() * $flights.length)
    $flights = $flights.map((f, i) => ({ ...f, status: any(STATUS), ...(i === k ? { city: any(CITIES), gate: `${any(["A", "B", "C"])}${1 + Math.floor(Math.random() * 20)}` } : {}) }))
  }
  return <Card m:theme="night" title="Kalkış · Departures">
    <div sx={{ flex: "col", gap: 2 }}>
      {() => $flights.map((f) => <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        {/* Each field has a fixed length, so the columns of the board line up row after row.
            - The time uses a reel of digits and ":" only (chars): a shorter reel flips faster to its character.
            - frame={false}: the bare cells, the Card is the board's frame. size="sm" smaller cards.
            - label: what a screen reader hears before the text ("Saat: 14:05"). */}
        <SplitFlap value={f.time} length={5} chars=" 0123456789:" frame={false} size="sm" label="Saat" />
        <SplitFlap value={f.city} length={8} frame={false} size="sm" label="Varış" />
        <SplitFlap value={f.gate} length={3} align="end" frame={false} size="sm" color="warning" label="Kapı" />
        {/* The status: live="polite" announces the new status to screen readers once the cells have settled (only
            here: announcing every field of every row would be noise). The colour tells "late" apart at a glance. */}
        <SplitFlap value={f.status} length={12} frame={false} size="sm" live="polite" label="Durum"
          color={f.status === "GECİKMELİ" || f.status === "KAPI KAPANDI" ? "danger" : "success"} />
      </div>)}
      {/* An ordinary Button: Tab to reach it, Enter or Space to press it. */}
      <Button size="sm" on:click={update}>Güncelle</Button>
    </div>
  </Card>
}
