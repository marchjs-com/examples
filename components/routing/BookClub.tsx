import { createRouter, Router, params, back } from "march/router"
import { Card, Button, ListRow, Badge } from "march/ui"
import { book } from "march/icons"

// kitap kulübü: raf ve kitap sayfası iki rota; kitabın sayfası adresteki :id'yi okur, Geri bir önceki sayfaya döner
const BOOKS = [
  { id: "1", title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", pages: 160, mood: "Hüzünlü" },
  { id: "2", title: "Tutunamayanlar", author: "Oğuz Atay", pages: 724, mood: "Derin" },
  { id: "3", title: "Saatleri Ayarlama Enstitüsü", author: "Ahmet Hamdi Tanpınar", pages: 382, mood: "Esprili" },
]

// raf: her kitap kendi sayfasına giden bir satır
function Shelf() {
  return <Card title="Bu ayın rafı">
    {BOOKS.map((b) => <ListRow href={`/kitap/${b.id}`} lead={book} title={b.title} sub={b.author} trail={<Badge tone="neutral">{b.mood}</Badge>} />)}
  </Card>
}

// kitabın sayfası: hangi kitap olduğunu adres söyler (/kitap/2)
function Book() {
  const book = BOOKS.find((b) => b.id === params().id)
  return <Card title={book?.title ?? "Böyle bir kitap yok"} subtitle={book?.author}>
    <p sx={{ color: "muted" }}>{book ? `${book.pages} sayfa · ${book.mood}` : "Raf değişmiş olabilir."}</p>
    <Button variant="secondary" on:click={() => back()}>← Rafa dön</Button>
  </Card>
}

export function BookClub() {
  createRouter({ routes: { "/": { component: Shelf }, "/kitap/:id": { component: Book } } })
  return <div sx={{ w: "sm" }}>
    <Router notFound={<p>Bu raf boş.</p>} />
  </div>
}
