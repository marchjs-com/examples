// CourseProgress: the real-life ProgressRing example.
//
// What it shows: a list of courses in a Card; each row starts with a small ring that shows how many sections are
// done, with the percent in the middle. When to use this pattern: a ring as the leading mark of a list row.
//
// Accessibility: each ring is an image named "<label>: <value> of <max>"; the number in the middle is hidden from
// screen readers so it is not read twice. Animation: the ring fills on the motion engine, so reduced motion, global
// speed and "Stop all" apply.

import { ProgressRing } from "march/charts"
import { Card, ListRow } from "march/ui"

// Course name, finished and total sections. (The key names are Turkish: ad = name, bitti = done, toplam = total.)
const COURSES = [
  { ad: "TypeScript'e giriş", bitti: 18, toplam: 20 },
  { ad: "Sinyallerle durum", bitti: 9, toplam: 14 },
  { ad: "Erişilebilir formlar", bitti: 2, toplam: 12 },
]

export function CourseProgress() {
  // ProgressRing props used on every row:
  // - value / max: finished sections out of all sections.
  // - size / thickness: diameter and stroke in px (the defaults are 64 and 8).
  // - label: the accessible name; format: the text in the middle (here the percent).
  //  No colour is given, so the ring takes its low / mid / high level colour from the default thresholds (50 and 80
  // percent).
  return <Card title="Derslerim">
    {/* ListRow's `lead` slot holds the ring at the start of the row; title and sub are the two text lines. */}
    {COURSES.map((c) => <ListRow title={c.ad} sub={`${c.bitti} / ${c.toplam} bölüm`}
      lead={<ProgressRing value={c.bitti} max={c.toplam} size={44} thickness={5} label={c.ad} format={(v: number) => `${Math.round((v / c.toplam) * 100)}`} />} />)}
  </Card>
}
