// ProductShelf: the real-life Carousel example.
//
// A store shelf: product cards three at a time, each with an "add to basket" button, and the basket count in the
// heading. Use this pattern for any row of cards that is wider than the screen: product shelves, feature lists, photo
// strips. The slides are ordinary components, so they can hold buttons and other controls.
import { Carousel, Card, Button, Badge, toast } from "march/ui"
import { shoppingBag } from "march/icons"

// The products: a name, a price and an optional tag.
const products = [
  { name: "Termos", price: 450, tag: "yeni" },
  { name: "Kupa", price: 180 },
  { name: "Defter", price: 120, tag: "indirim" },
  { name: "Çanta", price: 900 },
  { name: "Kalem seti", price: 95 },
  { name: "Şapka", price: 300 },
]

// One product card: the tag (if any) as a Badge, the price and the button. onAdd is given by the parent.
const Product = (props: { name: string; price: number; tag?: string; onAdd: () => void }) => <Card title={props.name}>
  <div sx={{ flex: "col", gap: 2 }}>
    {props.tag ? <div><Badge tone="info">{props.tag}</Badge></div> : null}
    <strong sx={{ text: "lg" }}>{props.price} ₺</strong>
    <Button size="sm" icon={shoppingBag} on:click={props.onAdd}>Sepete ekle</Button>
  </div>
</Card>

export function ProductShelf() {
  // The number of products in the basket (reactive state, shown in the heading).
  let $cart = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <strong>Önerilenler · sepette {() => $cart} ürün</strong>
    {/* perView={3} shows three cards at a time on wide screens. label names the carousel; labels rewords the accessible
        names of the previous / next buttons and of each dot (slide is a function of the position). The children are
        the slides: one Product per item. Adding to the basket raises the count and confirms with a toast (a short,
        polite status message). Keyboard: the track is focusable and arrow keys scroll it. */}
    <Carousel label="Önerilen ürünler" perView={3} labels={{ previous: "Önceki ürünler", next: "Sonraki ürünler", slide: (n: number) => `${n}. ürün` }}>
      {products.map((p) => <Product name={p.name} price={p.price} tag={p.tag} onAdd={() => { $cart++; toast(`${p.name} sepete eklendi`) }} />)}
    </Carousel>
  </div>
}
