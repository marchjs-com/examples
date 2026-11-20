import { Empty, Button } from "march/ui"

// boş tabak: emojili boş durum; "Yemek ekle" tabağı doldurur, "Bitir" yeniden boşaltır
const FOODS = ["🍕", "🥗", "🍜", "🌮", "🍰"]

export function EmptyPlate() {
  let $plate: string[] = []
  return <div sx={{ flex: "col", gap: 2 }}>
    {() => $plate.length
      ? <div sx={{ flex: ["row", "wrap"], gap: 2, text: "xl" }}>
          {$plate.join(" ")}
          <Button size="sm" variant="ghost" on:click={() => $plate = []}>Bitir</Button>
        </div>
      : <Empty icon="🍽️" title="Tabak bomboş" action={<Button variant="primary" on:click={() => $plate = [...$plate, FOODS[0]!]}>Yemek ekle</Button>}>
          Acıktıysanız bir şeyler ekleyin.
        </Empty>}
    {() => $plate.length > 0 && $plate.length < FOODS.length
      ? <Button size="sm" on:click={() => $plate = [...$plate, FOODS[$plate.length]!]}>Bir tane daha</Button> : null}
  </div>
}
