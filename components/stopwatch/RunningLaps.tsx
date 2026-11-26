// RunningLaps.tsx: the real-life Stopwatch example.
// A running coach's lap timer: each "Tur" press records a lap of the 400 m track, the stopwatch marks the best and the
// worst lap, and a summary card shows the average lap and the pace per kilometre.
// Use this pattern for any split timing (swimming lengths, presentation sections, cooking steps): onLap hands you
// every lap and the list of laps so far, and you compute what your users care about.
import { Stopwatch, Card, Stat } from "march/ui"

// Minutes and seconds of a duration in ms, for the summary ("1:32").
const mmss = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}`

export function RunningLaps() {
  // The laps so far (ms each), kept from onLap; a new array is assigned, so everything reading $laps updates.
  let $laps = [] as number[]
  const avg = () => ($laps.length ? $laps.reduce((a, b) => a + b, 0) / $laps.length : 0)
  return <Card title="Pist antrenmanı · 400 m">
    <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
      {/* texts: every button text and the lap name are props, so the stopwatch speaks the page's language.
          onLap(lap, laps): `lap` is { lap, total } in ms; `laps` is every lap so far. onReset clears our copy.
          decimals={1}: tenths are enough for running. The lap list is a polite live region, so a screen reader
          announces each new lap; the buttons are real Buttons (Tab, Enter, Space). */}
      <Stopwatch decimals={1} label="Tur zamanlayıcı"
        texts={{ start: "Başlat", stop: "Durdur", resume: "Sürdür", lap: "Tur", reset: "Sıfırla", lapName: (n: number) => `${n}. tur` }}
        onLap={(_l, all) => { $laps = all.map((x) => x.lap) }} onReset={() => { $laps = [] }} />
      {/* The summary: Stat shows a label and a value; the pace is the average lap × 2.5 (400 m × 2.5 = 1 km). */}
      <div sx={{ flex: "col", gap: 3 }}>
        <Stat label="Tur sayısı" value={$laps.length} />
        <Stat label="Ortalama tur" value={$laps.length ? mmss(avg()) : "—"} />
        <Stat label="Tempo (dk/km)" value={$laps.length ? mmss(avg() * 2.5) : "—"} />
      </div>
    </div>
  </Card>
}
