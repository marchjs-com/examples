import { Carousel, Card, Button, Badge, toast } from "march/ui"
import { shoppingBag } from "march/icons"

// bir mağaza rafı: üçerli ürün kartları, sepete ekle; sepet sayısı başlıkta
const products = [
  { name: "Termos", price: 450, tag: "yeni" },
  { name: "Kupa", price: 180 },
  { name: "Defter", price: 120, tag: "indirim" },
  { name: "Çanta", price: 900 },
  { name: "Kalem seti", price: 95 },
  { name: "Şapka", price: 300 },
]

// tek ürün kartı
const Product = (props: { name: string; price: number; tag?: string; onAdd: () => void }) => <Card title={props.name}>
  <div sx={{ flex: "col", gap: 2 }}>
    {props.tag ? <div><Badge tone="info">{props.tag}</Badge></div> : null}
    <strong sx={{ text: "lg" }}>{props.price} ₺</strong>
    <Button size="sm" icon={shoppingBag} on:click={props.onAdd}>Sepete ekle</Button>
  </div>
</Card>

export function ProductShelf() {
  let $cart = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <strong>Önerilenler · sepette {() => $cart} ürün</strong>
    <Carousel label="Önerilen ürünler" perView={3} labels={{ previous: "Önceki ürünler", next: "Sonraki ürünler", slide: (n: number) => `${n}. ürün` }}>
      {products.map((p) => <Product name={p.name} price={p.price} tag={p.tag} onAdd={() => { $cart++; toast(`${p.name} sepete eklendi`) }} />)}
    </Carousel>
  </div>
}
