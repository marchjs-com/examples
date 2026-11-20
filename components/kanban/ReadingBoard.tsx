import { Kanban } from "march/ui"

// bir okuma panosu: kitabı sürükle (ya da odaklayıp Alt+→), okundu sütununa varınca tebrik satırı çıkar
type Book = { id: string; title: string }
type Col = { id: string; title: string; tone: string; items: Book[] }

export function ReadingBoard() {
  let $cols: Col[] = [
    { id: "next", title: "Okunacak", tone: "info", items: [{ id: "b1", title: "Dune" }, { id: "b2", title: "Kürk Mantolu Madonna" }] },
    { id: "now", title: "Okunuyor", tone: "warn", items: [{ id: "b3", title: "Simyacı" }] },
    { id: "done", title: "Okundu", tone: "success", items: [] },
  ]
  const move = (b: Book, from: string, to: string) => {
    $cols = $cols.map((c) => c.id === from ? { ...c, items: c.items.filter((x) => x.id !== b.id) } : c.id === to ? { ...c, items: [...c.items, b] } : c)
  }
  const read = () => $cols.find((c) => c.id === "done")!.items.length
  return <div sx={{ flex: "col", gap: 2 }}>
    <Kanban columns={() => $cols} onMove={move} />
    <p sx={{ text: "bold", color: "success" }}>{() => read() ? `Tebrikler: ${read()} kitap bitti 📚` : "Henüz bitmiş kitap yok"}</p>
  </div>
}
