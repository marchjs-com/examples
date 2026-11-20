import { Checkbox } from "march/ui"
import { sparkles } from "march/icons"

// tatil bavulu: her eşyayı işaretledikçe sayaç dolar; hepsi hazır olunca yola çıkma vakti
const items = ["Pasaport", "Güneş kremi", "Mayo", "Şarj aleti", "Kitap", "Gözlük"]

export function PackingList() {
  let $packed: string[] = []
  const toggle = (item: string, on: boolean) => $packed = on ? [...$packed, item] : $packed.filter((x) => x !== item)
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {items.map((item) => <Checkbox variant="chip" label={item} value={$packed.includes(item)} onChange={(on: boolean) => toggle(item, on)} />)}
    </div>
    <span sx={{ text: "bold", color: $packed.length === items.length ? "brand-green" : "muted" }}>
      {$packed.length === items.length ? "Bavul hazır, iyi yolculuklar!" : `${$packed.length} / ${items.length} eşya bavulda`}
    </span>
    <Checkbox icon={sparkles} m:color="brand-gold" label="Bavulu tamamen hazırla" value={$packed.length === items.length}
      indeterminate={$packed.length > 0 && $packed.length < items.length} onChange={(on: boolean) => $packed = on ? [...items] : []} />
  </div>
}
