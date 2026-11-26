import { BarList } from "march/charts"
import { Button, Card } from "march/ui"

// BarListLab: every BarList prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y (a getter), format, sort, limit, max, color, colors, title, empty, class, onSelect,
// animate (bars grow in one after another, rows glide when their rank changes; exit: false turns the exit off).
// Use it to look up a prop, to see how the props combine, and as the fixture BarListLab.test.tsx checks.
// The buttons grow, remove and clear the rows, so every change animation (update, exit, empty) can be seen.

// Task progress: is = task, yuzde = percent done. The keys are Turkish on purpose, to show that x / y can name any key.
const TASKS = [{ is: "Tasarım", yuzde: 80 }, { is: "Kod", yuzde: 55 }, { is: "Test", yuzde: 30 }, { is: "Yayın", yuzde: 5 }]

export function BarListLab() {
  let $tasks = TASKS   // the rows, replaced (never mutated) by the buttons
  let $picked = "—"    // last selected row, written by onSelect
  let $empty = false   // shows the `empty` text when true
  // Main list, prop by prop:
  // - data={() => …}: a function reading signals, so the list redraws (and animates) when $tasks or $empty changes.
  // - x="is": the label key; y={(r) => r.yuzde}: a getter instead of a key, for values that need computing.
  // - sort={false}: keep the data order (a task list has its own order); by default the largest comes first.
  // - max={100}: a full bar means 100 %, so 80 % fills four fifths, not the whole width.
  // - format: the value as "%80" (the Turkish way of writing a percent).
  // - colors={["#1fa463"]}: your own color instead of the palette.
  // - title: the accessible name of the list; empty: the text shown when there are no rows.
  // - onSelect: turns each row into a real button and is called with { label, value, rank, datum }.
  // - animate={{ easing: "out", stagger: 50, exit: false }}: bars grow in 50 ms after one another and morph without
  //   overshoot; `exit: false` removes a row at once instead of letting it shrink away. Other forms: true (spring, the
  //   default), false (no motion), an easing name like "bounce", { duration, delay, enter, update } as well, or
  //   (ctx) => … deciding per row from { index, key, phase }. Reduced motion → no motion.
  // Keyboard: with onSelect every row is a button, so Tab moves between rows and Enter / Space selects.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-work, lab-empty, lab-drop, lab-picked) are hooks for BarListLab.test.tsx.
          "Work" adds 10 points to every task (capped at 100), "Finish the first task" drops the first row. */}
      <Button class="lab-work" size="sm" on:click={() => { $tasks = $tasks.map((t) => ({ ...t, yuzde: Math.min(100, t.yuzde + 10) })) }}>Çalış</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <Button class="lab-drop" size="sm" variant="ghost" on:click={() => { $tasks = $tasks.slice(1) }}>İlk işi bitir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <BarList class="lab-tasks" data={() => ($empty ? [] : $tasks)} x="is" y={(r: { yuzde: number }) => r.yuzde} sort={false} max={100}
      format={(v: number) => `%${v}`} colors={["#1fa463"]} title="Görevler" empty="Görev yok" animate={{ easing: "out", stagger: 50, exit: false }} onSelect={(r: { label: string; value: number; rank: number }) => { $picked = `${r.rank}. ${r.label}` }} />
    {/* Second list on a dark theme (m:theme="night"): the same rows sorted largest first (the default), cut to the top
        two with limit={2}, painted with palette slot 3 (color={3}), and the default spring animation. When the first
        task is dropped, the row that falls out of the top two shrinks away while the next one grows in. */}
    <Card m:theme="night">
      <BarList class="lab-top" data={() => $tasks} x="is" y="yuzde" limit={2} color={3} title="İlk iki" />
    </Card>
  </div>
}
