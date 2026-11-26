// BarListLab: the full-featured BarList example; it uses every prop at least once.
//
// Props shown here: data (a function, so it stays live), x, y (a getter), format, sort, limit, max, color, colors,
// title, empty, class and onSelect.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// BarListLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { BarList } from "march/charts"
import { Button, Card } from "march/ui"

// Demo rows: a task name and its progress in percent.
const TASKS = [{ is: "Tasarım", yuzde: 80 }, { is: "Kod", yuzde: 55 }, { is: "Test", yuzde: 30 }, { is: "Yayın", yuzde: 5 }]

export function BarListLab() {
  // The tasks (a new list on each change), the last selected row and the "no data" switch (reactive state).
  let $tasks = TASKS
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-work" size="sm" on:click={() => { $tasks = $tasks.map((t) => ({ ...t, yuzde: Math.min(100, t.yuzde + 10) })) }}>Çalış</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/* The first list:
        - data as a function: re-read when $tasks or $empty change; an empty list shows `empty`.
        - x="is" is the label key; y as a getter reads the value from each row (a key such as y="yuzde" works too).
        - sort={false}: keep the data order (the default is largest first). max={100}: the value that fills a whole
          bar (default: the largest value), so progress in percent reads honestly.
        - format: how values are written; colors: overrides the palette.
        - title: the list's accessible name. class: added to the root so CSS or a test can find it.
        - onSelect: makes every row a real button (Tab, Enter, Space) and reports { label, value, rank }. */}
    <BarList class="lab-tasks" data={() => ($empty ? [] : $tasks)} x="is" y={(r: { yuzde: number }) => r.yuzde} sort={false} max={100}
      format={(v: number) => `%${v}`} colors={["#1fa463"]} title="Görevler" empty="Görev yok" onSelect={(r: { label: string; value: number; rank: number }) => { $picked = `${r.rank}. ${r.label}` }} />
    {/* The second list shows the other switches: limit={2} keeps the first two rows after sorting, color={3} picks
        the fourth palette slot (the index is 0-based). m:theme="night" on the Card puts it on a dark surface. */}
    <Card m:theme="night">
      <BarList class="lab-top" data={() => $tasks} x="is" y="yuzde" limit={2} color={3} title="İlk iki" />
    </Card>
  </div>
}
