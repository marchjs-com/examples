import { ProgressRing } from "march/charts"
import { Card, ListRow } from "march/ui"

// Course progress on a learning platform: a real-life list with a small ProgressRing at the start of each row.
// Each ring fills to the share of chapters done and takes its level color (low / mid / high) from that share, so the
// course that needs attention stands out without reading a single number.
// Use small rings in list rows like this when every item has its own goal: courses, profile completeness, quotas.

// One row per course: ad = name, bitti = chapters done, toplam = chapters in total.
const COURSES = [
  { ad: "TypeScript'e giriş", bitti: 18, toplam: 20 },
  { ad: "Sinyallerle durum", bitti: 9, toplam: 14 },
  { ad: "Erişilebilir formlar", bitti: 2, toplam: 12 },
]

export function CourseProgress() {
  // Composition: ListRow already lays out a lead, a title and a sub line, so the ring simply goes into `lead` and the
  // row gives it the course name and the "done / total" text for free.
  //
  // ProgressRing props:
  // - value / max: chapters done out of the course's total, so each ring has its own full score.
  // - size={44} thickness={5}: small enough to sit in a row like an avatar.
  // - label: the course name becomes the ring's accessible name.
  // - format: the number in the middle as a percent of the total (90, 64, 17) instead of the raw chapter count.
  // - No color / thresholds: the default limits (50 % and 80 %) pick the level color, red-ish → yellow → green.
  // Motion: no `animate` prop, so the default spring sweeps each ring from 0 to its value on first draw while the
  // number counts along. animate={false} draws them full at once; reduced motion is honoured automatically.
  // Accessibility: each ring is an image named "<label>: <formatted value> of <max>"; the middle number is hidden from
  // screen readers so it is not read twice.
  return <Card title="Derslerim">
    {COURSES.map((c) => <ListRow title={c.ad} sub={`${c.bitti} / ${c.toplam} bölüm`}
      lead={<ProgressRing value={c.bitti} max={c.toplam} size={44} thickness={5} label={c.ad} format={(v: number) => `${Math.round((v / c.toplam) * 100)}`} />} />)}
  </Card>
}
