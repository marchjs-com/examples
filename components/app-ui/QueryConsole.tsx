import { AppUI, Button, Field, StatusBar, Textarea, row, col, tabs, toast } from "march/ui"
import { database, play, list, terminal } from "march/icons"

// gerçek hayattan: küçük bir veri tabanı konsolu. Solda tablolar, ortada sorgu, altta sonuç; üst çubukta Çalıştır,
// altta durum çubuğu. Yerleşim menüsünde iki hazır düzen var.
const TABLES = ["users", "orders", "products"]

export function QueryConsole() {
  let $sql = "select * from users limit 3"
  let $rows: string[] = []
  const run = () => { $rows = ["1 · Ada", "2 · Deniz", "3 · Ece"]; toast("Sorgu çalıştı (3 satır)") }
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
    <AppUI title="veritabanı" description="yerel kopya" panels={panels} commands={false}
      presets={{
        work: { title: "Çalışma", tree: () => row([0.25, tabs("tables")], [0.75, col([0.5, tabs("query")], [0.5, tabs("result")])]) },
        focus: { title: "Odak", tree: () => tabs(["query", "result", "tables"]) },
      }}
      tools={<Button size="sm" icon={play} on:click={run}>Çalıştır</Button>}
      status={<StatusBar items={[{ id: "db", text: "bağlı: demo.db", tone: "success" }, { id: "rows", text: () => `${$rows.length} satır`, side: "end" }]} />} />
  </div>
}
