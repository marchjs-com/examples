// EventEntrance: the real-life LedBoard example.
//
// The LED sign at the door of an event: it welcomes people, points them to the right gate, shows the time and counts
// down to the opening talk. Staff can pause it (Space on the focused board) or skip to the next scene (arrow keys).
// Use this pattern for signage: a list of scenes with their own options, one board, one clock.
import { LedBoard } from "march/led"
import { Card } from "march/ui"

// The talk starts at the next full hour (so the countdown always has something to count).
const start = new Date()
start.setMinutes(60, 0, 0)

// Each scene sets one kind of content and, if needed, its own options:
// - text scrolls when it is wider than the board and stands when it fits; `:heart:` and `:arrow-right:` are pixel emoji.
// - `effect` changes how text appears (here the gate number types itself).
// - `clock: "HH:mm"` shows the time; `countdown` counts to a moment and shows `done` when it is over.
// - `transition` overrides the board's transition for the scene it leads into.
const scenes = [
  { text: "HADİ'ye hoş geldin :heart:" },
  { text: "Kayıt: Kapı 3 :arrow-right:", effect: "typewriter" },
  { eye: "happy", mouth: "smile", duration: 2200, transition: "iris" },
  { clock: "HH:mm", duration: 4000 },
  { countdown: start, done: "BAŞLADI", duration: 5000, transition: "rain" },
] as const

export function EventEntrance() {
  // color="amber": a classic one-color sign (emoji lose their own colors but keep their shapes, since features are
  // holes, not dark pixels). speed is in LEDs per second; scale "auto" draws the 8-row font twice as big on 16 rows.
  // The board names itself with `label` and tells screen readers each scene's text once (a polite live region).
  return <Card title="Etkinlik girişi">
    <LedBoard scenes={scenes} cols={72} rows={16} color="amber" speed={34} transition="wipe" scanlines label="Giriş tabelası" />
  </Card>
}
