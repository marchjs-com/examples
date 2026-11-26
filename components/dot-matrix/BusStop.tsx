import { DotMatrix, Button, Card } from "march/ui"
import { onCleanup } from "march"

// BusStop: the real-life DotMatrix example.
// The display at a bus stop: one row per bus with its line number, its destination and the minutes until it
// arrives. Destinations longer than their window scroll like a real LED sign; the minutes count down, and a bus that
// arrives shows the word for "now". Use this pattern for any live board that must read from a distance: arrivals, queue
// numbers, a factory line's counters.

// The buses and their minutes. In an app these would come from a feed (a query or a channel); the board does not care
// where a value comes from, it only follows it.
interface Bus { line: string; to: string; min: number }

export function BusStop() {
  let $buses: Bus[] = [
    { line: "34", to: "Zincirlikuyu", min: 2 },
    { line: "500T", to: "Tuzla Şifa Mahallesi - Cevizlibağ", min: 6 },
    { line: "E-10", to: "Kadıköy", min: 11 },
  ]
  // A minute passes every 4 seconds here, so the example moves while you watch. `minute()` lowers every bus by one;
  // a bus that reached 0 goes to the back of the list with a new time.
  const minute = () => {
    $buses = $buses.map((b) => (b.min > 0 ? { ...b, min: b.min - 1 } : { ...b, min: 12 + Math.floor(Math.random() * 8) }))
      .sort((a, b) => a.min - b.min)
  }
  const timer = setInterval(minute, 4000)
  // Stop the timer when the example goes away (the IDE renders it again on every save).
  onCleanup(() => clearInterval(timer))
  return <Card m:theme="night" title="Durak 1204 · Levent">
    <div sx={{ flex: "col", gap: 2 }}>
      {() => $buses.map((b) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
        {/* The line number: a fixed window of 4 characters aligned to the end, so "34" and "500T" line up on the
            right like on a real sign. color="warning" is the classic amber; motion={false} because a line number
            should never wipe when the list reorders. */}
        <DotMatrix value={b.line} columns={4} align="end" color="warning" motion={false} label="Hat" />
        {/* The destination: 14 characters wide. A longer name scrolls (scroll="auto" is the default) after a hold of
            1.5 s, at 16 columns a second; it pauses while the pointer is over it, and only runs while the sign is on
            screen. Under reduced motion it stands still on the start of the name; the full name is always in the
            accessible label (the board's label plus the whole name). */}
        <DotMatrix value={b.to} columns={14} hold={1500} speed={16} label="Yön" />
        {/* The minutes: a number would be written in the page's language; here we write the text ourselves so 0 reads
            the word for "now". A new value dissolves in dot by dot (transition="dissolve"); 0 lights in green to catch the eye. */}
        <DotMatrix value={b.min === 0 ? "ŞİMDİ" : `${b.min} DK`} columns={5} align="end" transition="dissolve"
          color={b.min === 0 ? "success" : "warning"} label="Kalan süre" />
      </div>)}
      {/* A Button to skip ahead a minute without waiting for the timer. */}
      <Button size="sm" variant="ghost" on:click={minute}>Bir dakika ileri</Button>
    </div>
  </Card>
}
