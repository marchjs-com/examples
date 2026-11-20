import { BarList } from "march/charts"
import { Button, Card } from "march/ui"

// BarList'in bütün özellikleri: data (sinyal), x, y (getter), format, sort, limit, max, color, colors, title, empty,
// class, onSelect
const TASKS = [{ is: "Tasarım", yuzde: 80 }, { is: "Kod", yuzde: 55 }, { is: "Test", yuzde: 30 }, { is: "Yayın", yuzde: 5 }]

export function BarListLab() {
  let $tasks = TASKS
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-work" size="sm" on:click={() => { $tasks = $tasks.map((t) => ({ ...t, yuzde: Math.min(100, t.yuzde + 10) })) }}>Çalış</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <BarList class="lab-tasks" data={() => ($empty ? [] : $tasks)} x="is" y={(r: { yuzde: number }) => r.yuzde} sort={false} max={100}
      format={(v: number) => `%${v}`} colors={["#1fa463"]} title="Görevler" empty="Görev yok" onSelect={(r: { label: string; value: number; rank: number }) => { $picked = `${r.rank}. ${r.label}` }} />
    <Card m:theme="night">
      <BarList class="lab-top" data={() => $tasks} x="is" y="yuzde" limit={2} color={3} title="İlk iki" />
    </Card>
  </div>
}
