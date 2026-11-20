import { DataGrid } from "march/components/data-grid"
import { Empty, Button } from "march/ui"

// DataGrid'in bütün özellikleri bir arada: rows, columns, rowKey, height, rowHeight, groupBy + onGroupBy (denetimli),
// selectable, onEdit, footer, toolbar (tek tek araçlar), columnMenu, empty, labels, animate, filename, onActivate,
// label, class. (table: march/table'daki createTable() durumunu alır; önizlemede o paket yok.)
type Task = { code: string; title: string; team: string; points: number; done: boolean }
const tasks: Task[] = [
  { code: "M-1", title: "Giriş sayfası", team: "Web", points: 5, done: true },
  { code: "M-2", title: "Ödeme akışı", team: "Web", points: 8, done: false },
  { code: "M-3", title: "Bildirimler", team: "Mobil", points: 3, done: false },
  { code: "M-4", title: "Çevrimdışı mod", team: "Mobil", points: 13, done: false },
  { code: "M-5", title: "Rapor servisi", team: "API", points: 5, done: true },
  { code: "M-6", title: "Önbellek", team: "API", points: 2, done: false },
]

export function DataGridLab() {
  let $rows = tasks
  let $group: string[] = []
  let $dense = false
  let $empty = false
  let $opened = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $group = $group.length ? [] : ["team"]}>{() => ($group.length ? "Gruplamayı kaldır" : "Takıma göre grupla")}</Button>
      <Button size="sm" on:click={() => $dense = !$dense}>{() => ($dense ? "Rahat satırlar" : "Sıkı satırlar")}</Button>
      <Button size="sm" on:click={() => $empty = !$empty}>{() => ($empty ? "Görevleri geri getir" : "Listeyi boşalt")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Gruplar: ${$group.join(", ") || "yok"} · Açılan: ${$opened}`}</p>
    <DataGrid label="Sprint görevleri" class="lab-grid" filename="sprint" height={340}
      rows={() => ($empty ? [] : $rows)} rowKey={(r: Task) => r.code}
      rowHeight={() => ($dense ? 30 : 40)}
      groupBy={() => $group} onGroupBy={(keys: string[]) => $group = keys}
      selectable footer columnMenu animate
      toolbar={{ search: true, groups: true, filters: true, csv: false, count: true }}
      empty={<Empty title="Görev yok" />}
      labels={{ search: "Görev ara", rows: (n: string) => `${n} görev`, selected: (n: string) => `${n} seçili`, total: "Toplam puan" }}
      onEdit={(row: Task, key: string, value: unknown) => { $rows = $rows.map((r) => (r.code === row.code ? { ...r, [key]: key === "points" ? Number(value) : value } : r)) }}
      onActivate={(row: Task, key: string) => $opened = `${row.code} (${key})`}
      columns={[
        { key: "code", label: "Kod", width: 90, pin: "left" },
        { key: "title", label: "Görev", width: 180, editable: true },
        { key: "team", label: "Takım", width: 110, filter: "select" },
        { key: "points", label: "Puan", width: 100, type: "number", editable: true, aggregate: "sum" },
        { key: "done", label: "Bitti", width: 90, value: (r: Task) => (r.done ? "evet" : "hayır"), aggregate: "count" },
      ]} />
  </div>
}
