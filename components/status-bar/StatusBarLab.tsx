// StatusBarLab: the full-featured StatusBar example.
//
// What it shows: every StatusBar option: items (id, text, icon, side, tone, title, onSelect, command, priority, live),
// label, moreLabel, moreIcon, overflow, dot (your own mark for the tone dot), pulse and class.
// Use it as a catalogue: copy the prop you need into your own StatusBar.
//
// Animation: an item with tone "busy" has a breathing dot on March's motion engine, so the global speed, "Stop all"
// and the visitor's reduced-motion preference apply. `pulse={false}` (used here) holds the dot of a busy item still;
// in this Lab the dot is replaced by our own mark through `dot`, which switches between two characters.
// Accessibility: the bar is a named region (`label`); buttons are real buttons (`title` is their tooltip); items marked
// `live` are announced politely when their text changes; items that do not fit stay reachable in the "…" menu, whose
// accessible name is `moreLabel`.
import { StatusBar } from "march/ui"
import { bell } from "march/icons"
import { moreHorizontal } from "march/icons/lucide"

export function StatusBarLab() {
  // Reactive state: how many times the first item was pressed.
  let $count = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* overflow: items that do not fit (the lowest `priority` first) move to the "…" menu; overflow={false} keeps all
        of them in the bar. moreLabel and moreIcon rename and redraw that menu's button. dot={(tone) => node}
        replaces the default tone dot of items without an icon with our own mark; `tone()` is live, so the mark can
        change with it. pulse={false}: the dot of a busy item does not breathe. class is kept on the root (the tests
        find it). */}
    <StatusBar class="lab-bar" label="Durum" moreLabel="Daha fazla" moreIcon={moreHorizontal} pulse={false} overflow
      dot={(tone: () => string) => <b>{() => (tone() === "busy" ? "◌" : "◆")}</b>}
      items={[
        // No side: it sits at the start. onSelect makes it a button; its text is a function so it stays up to date.
        { id: "count", text: () => `${$count} tık`, title: "Say", onSelect: () => $count++ },
        // side: "end" and an icon (so no tone dot); priority 2 is low, so it is the first to move to the "…" menu.
        { id: "bell", side: "end", icon: bell, text: "2", title: "Bildirimler", tone: "busy", priority: 2 },
        // tone colours the dot; live: a change of this text is announced to screen readers.
        { id: "ok", side: "end", text: "Hazır", tone: "success", live: true },
      ]} />
  </div>
}
