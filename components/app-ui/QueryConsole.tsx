// QueryConsole: the real-life AppUI example.
//
// A small database console: tables on the left, the query in the middle, the result below; a Run button in the top bar
// and a status bar at the bottom. The layout menu offers two ready layouts. Use this pattern for any tool with a few
// cooperating panels, where users may want to rearrange or focus them.
import { AppUI, Button, Field, StatusBar, Textarea, row, col, tabs, toast } from "march/ui"
import { database, play, list, terminal } from "march/icons"

// The table names listed in the left panel (constant data, no state needed).
const TABLES = ["users", "orders", "products"]

export function QueryConsole() {
  // The SQL text and the result rows are reactive state shared by the panels, the Run button and the status bar.
  let $sql = "select * from users limit 3"
  let $rows: string[] = []
  // The demo "runs" the query by filling in fixed rows; a toast confirms it (a short, polite status message).
  const run = () => { $rows = ["1 · Ada", "2 · Deniz", "3 · Ece"]; toast("Sorgu çalıştı (3 satır)") }
  // The three panels. Pressing a table button writes a query for it into $sql; the SQL panel edits it with bind:value
  // (two-way binding); the result panel's `badge` is a function returning the row count (or null to hide it), so the
  // tab shows a live count; its body switches between the rows and an empty-state text.
  const panels = [
    { id: "tables", title: "Tablolar", icon: database, content: () => <div sx={{ p: 2, flex: "col", gap: 1 }}>
      {TABLES.map((t) => <Button size="sm" variant="ghost" on:click={() => $sql = `select * from ${t} limit 3`}>{t}</Button>)}
    </div> },
    { id: "query", title: "Sorgu", icon: terminal, content: () => <div sx={{ p: 2 }}><Field label="SQL"><Textarea bind:value={$sql} rows={3} /></Field></div> },
    { id: "result", title: "Sonuç", icon: list, badge: () => $rows.length || null, content: () => <div sx={{ p: 2, flex: "col", gap: 1 }}>
      {() => $rows.length ? $rows.map((r) => <code>{r}</code>) : <span sx={{ color: "muted" }}>Henüz sonuç yok</span>}
    </div> },
  ]
  return <div style={{ height: "20rem" }}>
    {/* title and description fill the top bar; `tools` puts the Run button there. `presets` are named layouts in the
        layout menu: "work" is tables | (query over result), "focus" is one tab group; row() and col() split with size
        ratios, tabs() lists panel ids. `status` is a StatusBar: a toned "connected" item and a live row count aligned
        to the end. commands={false} leaves out the dock's command-palette entries. */}
    <AppUI title="veritabanı" description="yerel kopya" panels={panels} commands={false}
      presets={{
        work: { title: "Çalışma", tree: () => row([0.25, tabs("tables")], [0.75, col([0.5, tabs("query")], [0.5, tabs("result")])]) },
        focus: { title: "Odak", tree: () => tabs(["query", "result", "tables"]) },
      }}
      tools={<Button size="sm" icon={play} on:click={run}>Çalıştır</Button>}
      status={<StatusBar items={[{ id: "db", text: "bağlı: demo.db", tone: "success" }, { id: "rows", text: () => `${$rows.length} satır`, side: "end" }]} />} />
  </div>
}
