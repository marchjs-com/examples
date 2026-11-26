// MeetingRoom.tsx: the real-life AnalogClock example.
// A meeting-room door screen: a large clock with the date in its window, the room's next booking beside it, and a
// warning colour on the second hand when the next meeting starts within ten minutes.
// Use this pattern on kiosk and lobby screens, where a clock is read from across the room and one glance should tell
// both the time and what happens next.
import { AnalogClock, Card, Badge } from "march/ui"

// The next booking: today, 40 minutes from when the page opened (a real app would load it from a calendar).
const next = { title: "Ürün planlama", start: new Date(Date.now() + 40 * 60_000) }

export function MeetingRoom() {
  // onTick runs once a second with the time the clock shows; we keep the minutes left in reactive state so the badge
  // and the second hand's colour follow it. No timer of our own: the clock already ticks.
  let $left = Math.round((next.start.getTime() - Date.now()) / 60_000)
  const fmt = new Intl.DateTimeFormat("tr-TR", { weekday: "short", day: "numeric", month: "short" })
  return <Card title="Toplantı odası · Boğaz">
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* size={240}: big enough to read from the door. readout puts a small window under the hub; it gets the shown
          time as a Date, so it can print anything derived from it (here the short date). color is the theme token of
          the second hand: "danger" when the meeting is close, "success" otherwise. numerals="quarters" keeps the dial
          calm: only 12, 3, 6 and 9. */}
      <AnalogClock size={240} numerals="quarters" label="Oda saati" readout={(d: Date) => fmt.format(d)}
        color={$left <= 10 ? "danger" : "success"}
        onTick={(d: Date) => { $left = Math.round((next.start.getTime() - d.getTime()) / 60_000) }} />
      <div sx={{ flex: "col", gap: 2 }}>
        <b>{next.title}</b>
        {/* The text says the same as the colour, so the warning never depends on colour alone. */}
        <Badge tone={$left <= 10 ? "danger" : "success"}>{$left > 0 ? `${$left} dk sonra` : "Başladı"}</Badge>
      </div>
    </div>
  </Card>
}
