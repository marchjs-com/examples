// DataGridLab: the full-featured DataGrid example; it uses every prop at least once.
//
// Props shown here: rows, columns, rowKey, height, rowHeight, groupBy + onGroupBy (controlled grouping), selectable,
// onEdit, footer, toolbar (single tools on / off), columnMenu, empty, labels, animate, filename, onActivate, label, class.
// (`table` takes the state of a createTable() from march/table; the preview has no such package, so it is not used.)
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DataGridLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { DataGrid } from "march/components/data-grid"
import { Empty, Button } from "march/ui"

// The row type. A typed row makes the callbacks below (rowKey, value, onEdit…) type-checked.
type Task = { code: string; title: string; team: string; points: number; done: boolean }
const tasks: Task[] = [
  { code: "M-1", title: "Giriş sayfası", team: "Web", points: 5, done: true },
  { code: "M-2", title: "Ödeme akışı", team: "Web", points: 8, done: false },
  { code: "M-3", title: "Bildirimler", team: "Mobil", points: 3, done: false },
  { code: "M-4", title: "Çevrimdışı mod", team: "Mobil", points: 13, done: false },
  { code: "M-5", title: "Rapor servisi", team: "API", points: 5, done: true },
  { code: "M-6", title: "Önbellek", team: "API", points: 2, done: false },
]

// The grid reads its data and settings through getters (() => …), so changing a $ variable updates it in place
// without remounting: rows, rowHeight and groupBy below are all live.
export function DataGridLab() {
  // $rows is the data (edits write back into it), $group the grouped column keys, $dense / $empty drive the buttons,
  // $opened shows what onActivate reported.
  let $rows = tasks
  let $group: string[] = []
  let $dense = false
  let $empty = false
  let $opened = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Three buttons that change props of the grid below: grouping, row density and an empty data set. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $group = $group.length ? [] : ["team"]}>{() => ($group.length ? "Gruplamayı kaldır" : "Takıma göre grupla")}</Button>
      <Button size="sm" on:click={() => $dense = !$dense}>{() => ($dense ? "Rahat satırlar" : "Sıkı satırlar")}</Button>
      <Button size="sm" on:click={() => $empty = !$empty}>{() => ($empty ? "Görevleri geri getir" : "Listeyi boşalt")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Gruplar: ${$group.join(", ") || "yok"} · Açılan: ${$opened}`}</p>
    {/* The DataGrid:
            - label: its accessible name (role="grid"); class: an extra class on the root, so tests / CSS can find it.
            - filename: the name of the CSV file (the CSV button is off in the toolbar here, the prop is shown anyway).
            - height / rowHeight: the scroll area in px and the row height; rowHeight as a getter makes density live.
            - rows as a getter, rowKey as a function: a stable id per row, so edits and selection follow the row.
            - groupBy + onGroupBy: controlled grouping. The accessor resets the grouping when it changes, and the column
              menu / toolbar report their changes through onGroupBy, so the button and the grid stay in sync.
            - selectable: checkboxes and keyboard selection; footer: totals over all filtered rows (uses `aggregate`);
              columnMenu: the ⋮ menu on each header; animate: row entrance, column slide and save flash run on the motion
              engine, so reduced motion, the global speed and "Stop all" apply; animate={false} turns them off.
            - toolbar: an object turns single tools off (here CSV is off).
            - empty: your own node for the empty state; labels: every text the grid writes (search box, row count,
              selected count, totals), here in Turkish.
            - onEdit(row, key, value): called when a cell with `editable` is saved; we write it into $rows. Values come
              back as text, so the number column converts with Number().
            - onActivate(row, key): Enter / double-click on a cell that is not editable.
            - columns: key (the row field), label, width, pin ("left" keeps a column in view while scrolling sideways),
              editable, type: "number", filter: "select" (a filter menu), aggregate (the footer / group total), and
              value(row) to show something computed instead of the raw field. */}
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
