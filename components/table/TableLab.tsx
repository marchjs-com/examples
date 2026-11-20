import { Table } from "march/table"
import { Button, Card, action } from "march/ui"
import { edit } from "march/icons"

// Table'ın özellikleri bir arada: rows (sinyal), columns (format, align, width, filter, render), rowKey, pageSize ve
// pageSizes, sort, search, selectable, rowActions, onRowClick, expand, empty, caption, label, layout (cards),
// toolbar ve toolbarEnd, exportable, rowClass, resizable, reorderable, onEdit (düzenlenebilir hücre)
type Task = { id: number; title: string; owner: string; points: number; done: boolean }
const make = (n: number): Task[] => Array.from({ length: n }, (_, i) => ({ id: i + 1, title: `Görev ${i + 1}`, owner: ["Ece", "Can", "Deniz"][i % 3]!, points: (i * 5) % 13 + 1, done: i % 4 === 0 }))

export function TableLab() {
  let $rows = make(12)
  let $clicked = "—"
  let $edits = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-add" size="sm" on:click={() => { $rows = make($rows.length + 1) }}>Görev ekle</Button>
      <Button class="lab-clear" size="sm" variant="ghost" on:click={() => { $rows = [] }}>Hepsini sil</Button>
      <span class="lab-state">Tıklanan: {$clicked} · düzenleme: {$edits}</span>
    </div>
    <Table class="lab-table" rows={() => $rows} rowKey="id" pageSize={5} pageSizes={[5, 10, 20]} sort={[{ key: "points", dir: "desc" }]} search
      selectable caption="Sprint görevleri" label="Görevler" toolbarEnd={<span sx={{ text: "xs", color: "muted" }}>{$rows.length} görev</span>}
      exportable resizable reorderable rowClass={(r: Task) => (r.done ? "is-done" : "")}
      empty="Görev yok, yeni bir tane ekle"
      onRowClick={(r: Task) => { $clicked = r.title }}
      expand={(r: Task) => <span sx={{ text: "sm", color: "muted" }}>{r.title}: {r.owner} · {r.points} puan</span>}
      rowActions={[action("Düzenle", (r: Task) => { $clicked = `düzenle ${r.title}` }, { icon: edit })]}
      onEdit={(r: Task, key: string, value: unknown) => { $edits++; $rows = $rows.map((x) => (x.id === r.id ? { ...x, [key]: value } : x)) }}
      columns={[
        { key: "title", label: "Görev", editable: true },
        { key: "owner", label: "Sahibi", filter: "select", options: ["Ece", "Can", "Deniz"] },
        { key: "points", label: "Puan", align: "end", format: "number", width: 90 },
        { key: "done", label: "Bitti", render: (r: Task) => (r.done ? "✓" : "") },
      ]} />
    <Card m:theme="night">
      <Table class="lab-cards" rows={() => $rows.slice(0, 3)} rowKey="id" layout="cards" toolbar={false} paging={false}
        columns={[{ key: "title", label: "Görev" }, { key: "points", label: "Puan", align: "end" }]} />
    </Card>
  </div>
}
