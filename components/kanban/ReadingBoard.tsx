// ReadingBoard: the creative-minimal Kanban example.
//
// What it shows: a reading board with three columns (to read, reading, read). Drag a book, or focus it and press Alt+Right, and
// when a book reaches the last column a congratulation line appears.
// When to use this pattern: the smallest Kanban. Cards use the default content (the item's `title`) and the default key (its
// `id`), so the only wiring is `onMove`.
// Accessibility: columns are labelled sections and cards are focusable, so the board works without a pointer (Alt+Left and
// Alt+Right move the focused card).
import { Kanban } from "march/ui"

type Book = { id: string; title: string }
type Col = { id: string; title: string; tone: string; items: Book[] }

export function ReadingBoard() {
  // The board data. Each column has an id, a title, a tone (the colour of its dot) and its items; the books are the items.
  // The Kanban does not move cards itself: it tells us through onMove and we update this list.
  let $cols: Col[] = [
    { id: "next", title: "Okunacak", tone: "info", items: [{ id: "b1", title: "Dune" }, { id: "b2", title: "Kürk Mantolu Madonna" }] },
    { id: "now", title: "Okunuyor", tone: "warn", items: [{ id: "b3", title: "Simyacı" }] },
    { id: "done", title: "Okundu", tone: "success", items: [] },
  ]
  // onMove(item, from, to): remove the book from its old column and add it to the new one (columns are replaced, not changed in place).
  const move = (b: Book, from: string, to: string) => {
    $cols = $cols.map((c) => c.id === from ? { ...c, items: c.items.filter((x) => x.id !== b.id) } : c.id === to ? { ...c, items: [...c.items, b] } : c)
  }
  // How many books are in the last column.
  const read = () => $cols.find((c) => c.id === "done")!.items.length
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* columns as a function so the board follows $cols. No card, itemKey or other props: the defaults use `title` and `id`. */}
    <Kanban columns={() => $cols} onMove={move} />
    {/* The congratulation line follows the count. */}
    <p sx={{ text: "bold", color: "success" }}>{() => read() ? `Tebrikler: ${read()} kitap bitti 📚` : "Henüz bitmiş kitap yok"}</p>
  </div>
}
