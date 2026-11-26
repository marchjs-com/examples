// ProductVariant: the real-life Swatch example.
//
// What it shows: the colour picker of a product page. The colours are a radio group of round swatches; an out-of-stock
// colour cannot be chosen, a gradient is a swatch too, the chosen colour's name is written above, a "last items" badge
// appears when stock is low, and the add-to-cart button uses the chosen colour.
// When to use this pattern: choosing one option from visual samples (colours, finishes, patterns). The colour alone says
// nothing to a screen reader, so every swatch gets a `label`, and the group is a `radiogroup`.
//
// Animation: the swatches' hover motion stops under the visitor's reduced-motion preference; nothing else here moves.
// Accessibility: the wrapper has role="radiogroup" and an aria-label; each Swatch passes role="radio", so its selected
// state is announced as aria-checked (without a role it would be aria-pressed). A disabled swatch is a disabled button
// and its label says why (sold out).
import { If } from "march"
import { Swatch, Card, Button, Badge, toast } from "march/ui"
import { shoppingBag } from "march/icons"

// A colour option: `color` is any CSS colour or gradient (it goes to the swatch as is), `name` is what people read,
// `stock` is how many are left (0 means sold out).
interface Variant { color: string; name: string; stock: number }
const variants: Variant[] = [
  { color: "#1f2a44", name: "Gece mavisi", stock: 12 },
  { color: "#c2410c", name: "Kiremit", stock: 3 },
  { color: "#4d7c0f", name: "Zeytin", stock: 0 },
  { color: "linear-gradient(135deg, #f2801f, #a3338c)", name: "Gün batımı (sınırlı)", stock: 1 },
]

export function ProductVariant() {
  // Reactive state: the chosen variant (the object itself, so `$pick === v` tells which swatch is selected).
  let $pick: Variant = variants[0] as Variant
  // Confirms the add-to-cart with a toast that names the chosen colour.
  const add = () => toast(`Sepete eklendi: Keten gömlek · ${$pick.name}`)
  return <Card title="Keten gömlek" subtitle="₺1.249">
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: "sm" }}>Renk: <b>{$pick.name}</b></span>
      {/* The radio group. Swatch props: color (colour, gradient or token), label (the accessible name and the tooltip;
          it says "sold out" when there is no stock), role="radio" (selected is then announced as aria-checked), shape
          and size (a large circle), mark (a tick on the selected one), selected (the ring and the state), disabled (not
          selectable), onClick (makes it a button; here it picks the variant). */}
      <div role="radiogroup" aria-label="Renk" sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {variants.map((v) => <Swatch color={v.color} label={v.stock ? v.name : `${v.name} (tükendi)`} role="radio" shape="circle" size="lg"
          mark selected={$pick === v} disabled={!v.stock} onClick={() => $pick = v} />)}
      </div>
      {/* <If> draws its child only while the condition is true: a low-stock warning for the chosen colour. */}
      <If when={$pick.stock < 5}><Badge tone="warn">Son {$pick.stock} ürün</Badge></If>
      <Button variant="primary" icon={shoppingBag} on:click={add}>Sepete ekle</Button>
    </div>
  </Card>
}
