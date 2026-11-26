// BookClub: the real-life routing example.
//
// What it shows: a book club with two routes: the shelf ("/") and a book page ("/kitap/:id"). The book page reads the
// :id from the address, and the back button returns to the previous page. When to use this pattern: a list page and a
// detail page; the address says which item is open, so links, reload and the back button all work.
//
// Accessibility: a row with `href` is a real link, so it works with the keyboard and opens in a new tab.
// The router is `march/router`: createRouter declares the routes, <Router /> draws the page that matches.

import { createRouter, Router, params, back } from "march/router"
import { Card, Button, ListRow, Badge } from "march/ui"
import { book } from "march/icons"

// The books. Their texts are content, so they stay Turkish.
const BOOKS = [
  { id: "1", title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", pages: 160, mood: "Hüzünlü" },
  { id: "2", title: "Tutunamayanlar", author: "Oğuz Atay", pages: 724, mood: "Derin" },
  { id: "3", title: "Saatleri Ayarlama Enstitüsü", author: "Ahmet Hamdi Tanpınar", pages: 382, mood: "Esprili" },
]

// The shelf: every book is a row that links to its own page.
function Shelf() {
  return <Card title="Bu ayın rafı">
    {BOOKS.map((b) => <ListRow href={`/kitap/${b.id}`} lead={book} title={b.title} sub={b.author} trail={<Badge tone="neutral">{b.mood}</Badge>} />)}
  </Card>
}

// The page of one book: the address tells which one it is (for example /kitap/2); params() holds the :id.
function Book() {
  const book = BOOKS.find((b) => b.id === params().id)
  return <Card title={book?.title ?? "Böyle bir kitap yok"} subtitle={book?.author}>
    <p sx={{ color: "muted" }}>{book ? `${book.pages} sayfa · ${book.mood}` : "Raf değişmiş olabilir."}</p>
    <Button variant="secondary" on:click={() => back()}>← Rafa dön</Button>
  </Card>
}

export function BookClub() {
  // createRouter declares the routes: a path maps to a component, and `:id` is a parameter. The component is drawn by
  // <Router />, which also takes `notFound`, what to show when no route matches.
  createRouter({ routes: { "/": { component: Shelf }, "/kitap/:id": { component: Book } } })
  return <div sx={{ w: "sm" }}>
    <Router notFound={<p>Bu raf boş.</p>} />
  </div>
}
