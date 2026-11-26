// Members: the real-life Table example.
//
// What it shows: a member-management table with 10,000 rows. Virtual scrolling keeps it fast (only the visible rows are
// drawn); columns can be sorted and filtered by city and by status; rows can be selected, and the selection feeds two bulk
// actions (invite, suspend, the second after a confirmation); the toolbar can export the rows as CSV.
// When to use this pattern: large lists that people manage: `virtual` + a fixed `height` and `rowHeight`, `selectable` +
// `bulkActions`, and per-column `filter` and `render`. Data here is generated; in a real app `rows` is your data, or
// use `source` to load pages from a server.
//
// Animation: none of its own to switch off.
// Accessibility: a table with scope="col" headers and aria-sort; it becomes a grid because rows are interactive
// (selection): arrow keys move between cells, Space toggles the selection of a row, and `caption` is the grid's
// accessible name. Status text (row range, selection count) is announced through aria-live.
import { Table } from "march/table"
import { Avatar, Badge, Rating, action } from "march/ui"
import { mail, trash } from "march/icons"

// Fake data. The lists are the vocabulary; `rnd` is a small deterministic hash, so the same rows are generated on every
// load (no Math.random): ROWS has 10,000 members with a name, city, status, score (1 to 5) and a join date (a timestamp).
const FIRST = ["Elif", "Mert", "Zeynep", "Can", "Ayşe", "Emre", "Selin", "Burak", "Ece", "Kerem", "Derya", "Onur"]
const LAST = ["Yılmaz", "Demir", "Kaya", "Arslan", "Çelik", "Şahin", "Aydın", "Öztürk", "Koç", "Polat"]
const CITY = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya"]
const STATUS = ["active", "invited", "suspended"] as const
// What the user reads for each status, and the Badge tone that colours it.
const LABEL: Record<string, string> = { active: "Etkin", invited: "Davetli", suspended: "Askıda" }
const TONE: Record<string, "success" | "info" | "warn"> = { active: "success", invited: "info", suspended: "warn" }
const rnd = (i: number, m: number) => ((i * 2654435761) >>> 0) % m
const ROWS = Array.from({ length: 10_000 }, (_, i) => ({
  id: i + 1, name: `${FIRST[rnd(i, FIRST.length)]} ${LAST[rnd(i * 7 + 3, LAST.length)]}`, city: CITY[rnd(i * 13 + 5, CITY.length)],
  status: STATUS[rnd(i * 7 + 2, 10) < 6 ? 0 : rnd(i * 5 + 1, 10) < 6 ? 1 : 2], score: 1 + rnd(i * 11, 5), joined: Date.UTC(2024, 0, 1) + rnd(i * 17, 680) * 864e5,
}))

export function Members() {
  // Bulk actions: action(label, run, options). `run` receives the selected rows (here it only waits 300 ms to fake a
  // server call). The options: an icon, a success message for the toast, and for the dangerous one `danger` and a
  // `confirm` question, so the user is asked before it runs. The selection is cleared when an action succeeds.
  const invite = action("Davet gönder", async () => { await new Promise((r) => setTimeout(r, 300)) }, { icon: mail, success: "Davet gönderildi" })
  const suspend = action("Askıya al", async () => { await new Promise((r) => setTimeout(r, 300)) }, { icon: trash, danger: true, confirm: "Seçilenler askıya alınsın mı?", success: "Askıya alındı" })
  // rows and rowKey: the data and the field that identifies a row. virtual + height + rowHeight: scroll inside a 420 px
  // box with fixed 48 px rows, drawing only what is visible. paging={false}: one scrolling list instead of pages.
  // selectable adds the checkbox column; bulkActions are the buttons that act on the selection. filename names the
  // exported file; caption is the accessible name of the table.
  return <Table rows={ROWS} rowKey="id" virtual height={420} rowHeight={48} paging={false} selectable bulkActions={[invite, suspend]} filename="uyeler" caption="Üyeler"
    columns={[
      // key: the field; label: the header text; align and width size the column.
      { key: "id", label: "#", align: "end", width: 64 },
      // render draws our own cell (an avatar and the name) instead of the plain value.
      { key: "name", label: "Üye", width: 220, render: (r: typeof ROWS[number]) => <span sx={{ flex: "row", gap: 2 }}><Avatar name={r.name} size="sm" />{r.name}</span> },
      // filter: "select" adds a dropdown filter to the column; options lists the choices.
      { key: "city", label: "Şehir", filter: "select", options: CITY },
      // options can be { value, label } pairs, so the filter shows the readable label; render shows a coloured Badge.
      { key: "status", label: "Durum", filter: "select", options: STATUS.map((value) => ({ value, label: LABEL[value]! })), render: (r: typeof ROWS[number]) => <Badge tone={TONE[r.status]} dot>{LABEL[r.status]}</Badge> },
      // A read-only Rating as the cell.
      { key: "score", label: "Puan", render: (r: typeof ROWS[number]) => <Rating value={r.score} readonly size="sm" /> },
      // format: "date" writes the timestamp as a date in the active locale.
      { key: "joined", label: "Katılım", format: "date" },
    ]} />
}
