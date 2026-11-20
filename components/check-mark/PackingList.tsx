import { CheckMark, Card, Button } from "march/ui"

// tatil çantası: her satıra basınca işaret dönerek ✓ olur; hepsi bitince başlık kutlar
const ITEMS = ["Pasaport", "Güneş kremi", "Mayo", "Şarj aleti"]

// bir satır: işaret ve adı, basınca hazır / değil
const Item = (p: { name: string; done: () => boolean; toggle: () => void }) =>
  <Button variant="ghost" on:click={p.toggle}>
    <CheckMark value={p.done} motion="flip" variant="soft" labels={{ yes: "Hazır", no: "Eksik" }} />
    <span>{p.name}</span>
  </Button>

export function PackingList() {
  let $packed: string[] = ["Pasaport"]
  const toggle = (n: string) => { $packed = $packed.includes(n) ? $packed.filter((x) => x !== n) : [...$packed, n] }
  return <Card title={() => ($packed.length === ITEMS.length ? "Çanta hazır! 🏖️" : `Çanta: ${$packed.length} / ${ITEMS.length}`)}>
    <div sx={{ flex: "col", gap: 1 }}>
      {ITEMS.map((n) => <Item name={n} done={() => $packed.includes(n)} toggle={() => toggle(n)} />)}
    </div>
  </Card>
}
