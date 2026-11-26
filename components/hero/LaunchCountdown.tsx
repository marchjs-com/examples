// LaunchCountdown: the creative-minimal Hero example.
//
// What it shows: a countdown to a launch. Each press of the button takes a day off; the title, the eyebrow and the
// highlighted words change together, and at zero the look switches to `aurora` with a "live now" message.
// When to use this pattern: a landing section whose copy depends on state. Hero reads most of its props once, so the
// Hero is built inside a `{() => ...}` block: when the state read there changes, Hero is drawn again.
// Motion: the centered and aurora looks use the motion engine (reduced motion and "Stop all" apply); `reveal="none"` would
// switch the entrance off.
import { Hero } from "march/landing"
import { sparkles } from "march/icons"

export function LaunchCountdown() {
  // The days left.
  let $days = 3
  // The block reads $days once into `days`, so every prop below uses the same value and Hero is rebuilt when it changes.
  // - variant: "centered" while counting, "aurora" at zero. size="md" and level={2}: medium height and an h2 title (the
  //   hero is not the page's top).
  // - eyebrow: the pill above the title. title + highlight: `highlight` is the part of the title drawn in the brand gradient,
  //   so it must be a piece of the title text. lead: the paragraph under the title.
  // - actions: buttons; the first is primary. Here one button that counts down and, at zero, restarts.
  return <div>{() => { const days = $days; return <Hero variant={days > 0 ? "centered" : "aurora"} size="md" level={2}
    eyebrow={days > 0 ? `${days} gün kaldı` : "Yayında!"}
    title={days > 0 ? `Fırlatmaya ${days} gün` : "March yayında"} highlight={days > 0 ? `${days} gün` : "yayında"}
    lead="Sinyaller, derleyici ve bileşenler tek pakette."
    actions={[{ label: days > 0 ? "Bir gün ileri sar" : "Baştan başlat", icon: sparkles, onClick: () => $days = $days > 0 ? $days - 1 : 3 }]} /> }}</div>
}
