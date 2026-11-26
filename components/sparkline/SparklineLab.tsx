import { Sparkline } from "march/charts"
import { Button, Card } from "march/ui"

// SparklineLab: every Sparkline prop in one place, the full-featured reference example.
// Props used: data (numbers or objects, a signal), y, variant (line / bar / winloss), width, height, format, zero, area,
// dot, color, colors, title, empty, animate (spring, an easing name, { stagger }, false).
// Use it to look up a prop, to see the three variants side by side, and as the fixture SparklineLab.test.tsx checks.
// The buttons append a value and empty / fill the data, so the change animations can be seen.

// Object rows: day (gun) and visits (ziyaret). The `y` prop picks which key is the value.
const visits = [{ gun: 1, ziyaret: 40 }, { gun: 2, ziyaret: 55 }, { gun: 3, ziyaret: 48 }, { gun: 4, ziyaret: 70 }]

export function SparklineLab() {
  let $nums = [3, 5, 4, 8, 6, 9]  // the numbers the line and the bars follow
  let $empty = false              // empties the first sparkline to show its `empty` text
  // The sparklines, one per span (the span classes are hooks for SparklineLab.test.tsx):
  // - .lab-nums: a line from a signal. zero includes 0 in the range (so small changes do not look dramatic), area
  //   fills under it, format writes the spoken summary in "adet" (pieces), title names it and empty is the spoken text
  //   with no data. animate="out": an easing name instead of the default spring.
  // - .lab-bars: variant="bar", tiny columns from the zero line; color={1} is palette slot 1. animate={{ stagger: 40 }}:
  //   the columns grow one after another, 40 ms apart.
  // - .lab-form: variant="winloss", an up block for every positive value, a down block for every negative one and a
  //   neutral tick for 0 (a team's last games); the summary says "4 wins, 2 losses, 1 ties". animate={false}: drawn at
  //   once.
  // - .lab-obj: object rows read through y="ziyaret"; dot={false} hides the marker on the last point.
  // - The last one: colors overrides the palette with your own color.
  // animate also takes { duration, easing, stagger, delay, enter, update, exit }, e.g. { enter: false } to skip the
  // first rise but keep updates. Reduced motion is honoured automatically.
  // Accessibility: every sparkline is an image whose name is its title plus a summary (count, first and last, min and
  // max, formatted with `format`). It has nothing to focus, so show the numbers as text when they matter.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Appends a value: the new point grows out of the last one, and a new column grows on the bar variant. */}
      <Button class="lab-add" size="sm" on:click={() => { $nums = [...$nums, ($nums.length * 7) % 11] }}>Değer ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      <span class="lab-nums"><Sparkline data={() => ($empty ? [] : $nums)} width={180} height={48} zero area format={(v: number) => `${v} adet`} title="Satış" empty="Satış yok" animate="out" /></span>
      <span class="lab-bars"><Sparkline data={() => $nums} variant="bar" width={120} height={40} color={1} animate={{ stagger: 40 }} title="Günlük satış" /></span>
      <span class="lab-form"><Sparkline data={[1, -1, 1, 1, 0, -1, 1]} variant="winloss" width={100} height={28} animate={false} title="Son maçlar" /></span>
      <span class="lab-obj"><Sparkline data={visits} y="ziyaret" dot={false} color={2} width={120} height={32} title="Ziyaret" /></span>
      <Sparkline data={[1, 4, 2, 5]} colors={["#f2801f"]} title="Turuncu" />
    </div>
    {/* The same numbers on a dark theme (m:theme="night"), with an area fill in palette slot 3. */}
    <Card m:theme="night">
      <Sparkline data={() => $nums} width={240} height={56} area color={3} title="Koyu zeminde" />
    </Card>
  </div>
}
