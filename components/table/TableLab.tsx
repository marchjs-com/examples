// TableLab: the full-featured Table example.
//
// What it shows: the main Table options together: rows (live, from state), columns (format, align, width, filter, render,
// editable), rowKey, pageSize and pageSizes, an initial sort, search, selectable, rowActions, onRowClick, expand, empty,
// caption, label, layout (cards), toolbar and toolbarEnd, exportable, rowClass, resizable, reorderable and onEdit (editable
// cells). Buttons above change the data so you can watch the table react.
// Use it as a catalogue: copy the prop you need into your own Table. The Table API is in the March docs (docs/table.md).
//
// Animation: none of its own to switch off.
// Accessibility: a table with scope="col" headers and aria-sort; it becomes a grid with arrow-key navigation because the
// rows are interactive. Enter or F2 edits an editable cell (Enter saves, Esc cancels), Space selects a row, and `caption`
// and `label` are the accessible name. Status text (row range, selection count) is announced through aria-live.
import { Table } from "march/table"
import { Button, Card, action } from "march/ui"
import { edit } from "march/icons"

// The row type and a generator: make(n) builds n tasks with a title, an owner (cycling through three people), points and a
// done flag, so the Lab can add rows later.
type Task = { id: number; title: string; owner: string; points: number; done: boolean }
const make = (n: number): Task[] => Array.from({ length: n }, (_, i) => ({ id: i + 1, title: `Görev ${i + 1}`, owner: ["Ece", "Can", "Deniz"][i % 3]!, points: (i * 5) % 13 + 1, done: i % 4 === 0 }))

export function TableLab() {
  // Reactive state: the rows, the last clicked item and how many edits were saved. Rows are replaced, not mutated.
  let $rows = make(12)
  let $clicked = "—"
  let $edits = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Buttons that change the data (one more row, or none), and a line that shows what the table reported. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-add" size="sm" on:click={() => { $rows = make($rows.length + 1) }}>Görev ekle</Button>
      <Button class="lab-clear" size="sm" variant="ghost" on:click={() => { $rows = [] }}>Hepsini sil</Button>
      <span class="lab-state">Tıklanan: {$clicked} · düzenleme: {$edits}</span>
    </div>
    {/* rows={() => $rows}: a function, so the table follows the state. rowKey identifies a row. pageSize and pageSizes: 5
        rows per page and a selector with the other sizes. sort: the initial order (points, descending). search: the search
        box. selectable: the checkbox column. caption and label: the accessible name. toolbarEnd: our own node at the end of
        the toolbar. exportable: the export menu. resizable and reorderable: change the column widths and order. rowClass
        returns a class per row (done tasks get "is-done"). empty: the text shown when there are no rows.
        onRowClick runs when a row is clicked or Enter is pressed on it (clicks on buttons, inputs and links are ignored).
        expand: the content of an expandable row. rowActions: action objects that run with the row (up to two show
        inline, more go into a menu). onEdit saves an edit of an `editable` column: it gets the row, the column key and
        the new value, and here replaces the row in the state. */}
    <Table class="lab-table" rows={() => $rows} rowKey="id" pageSize={5} pageSizes={[5, 10, 20]} sort={[{ key: "points", dir: "desc" }]} search
      selectable caption="Sprint görevleri" label="Görevler" toolbarEnd={<span sx={{ text: "xs", color: "muted" }}>{$rows.length} görev</span>}
      exportable resizable reorderable rowClass={(r: Task) => (r.done ? "is-done" : "")}
      empty="Görev yok, yeni bir tane ekle"
      onRowClick={(r: Task) => { $clicked = r.title }}
      expand={(r: Task) => <span sx={{ text: "sm", color: "muted" }}>{r.title}: {r.owner} · {r.points} puan</span>}
      rowActions={[action("Düzenle", (r: Task) => { $clicked = `düzenle ${r.title}` }, { icon: edit })]}
      onEdit={(r: Task, key: string, value: unknown) => { $edits++; $rows = $rows.map((x) => (x.id === r.id ? { ...x, [key]: value } : x)) }}
      columns={[
        // editable: double-click, Enter or F2 opens an editor in the cell.
        { key: "title", label: "Görev", editable: true },
        // filter: "select" adds a dropdown filter; options lists the choices.
        { key: "owner", label: "Sahibi", filter: "select", options: ["Ece", "Can", "Deniz"] },
        // align, format and width: a right-aligned number in a 90 px column.
        { key: "points", label: "Puan", align: "end", format: "number", width: 90 },
        // render draws our own cell content.
        { key: "done", label: "Bitti", render: (r: Task) => (r.done ? "✓" : "") },
      ]} />
    {/* m:theme="night" draws the card in the dark theme. layout="cards" draws each row as a card (the default "auto" does
        that on narrow screens); toolbar={false} hides the toolbar and paging={false} shows all rows. */}
    <Card m:theme="night">
      <Table class="lab-cards" rows={() => $rows.slice(0, 3)} rowKey="id" layout="cards" toolbar={false} paging={false}
        columns={[{ key: "title", label: "Görev" }, { key: "points", label: "Puan", align: "end" }]} />
    </Card>
  </div>
}
