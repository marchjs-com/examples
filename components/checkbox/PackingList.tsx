// PackingList: the creative-minimal Checkbox example.
//
// What it shows: a holiday suitcase. Each item is a chip-style Checkbox; a counter line fills as you pack, and a
// master checkbox at the bottom packs or empties everything (it shows the dash state while the case is half full).
// When to use this pattern: a short list of independent yes/no items whose progress matters to the user. Use the
// chip look when the options should read as small tags; use CheckboxGroup if you only need one array of values.
// Keyboard / accessibility: each chip is a real checkbox (Tab, Space). The box motion runs on the motion engine
// (reduced motion, global speed and "Stop all" apply; animate={false} turns it off).
import { Checkbox } from "march/ui"
import { sparkles } from "march/icons"

const items = ["Pasaport", "Güneş kremi", "Mayo", "Şarj aleti", "Kitap", "Gözlük"]

export function PackingList() {
  let $packed: string[] = []
  // Add or remove one item from the packed list.
  const toggle = (item: string, on: boolean) => $packed = on ? [...$packed, item] : $packed.filter((x) => x !== item)
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* One chip per item: value says whether it is packed, onChange receives the new state of that chip. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {items.map((item) => <Checkbox variant="chip" label={item} value={$packed.includes(item)} onChange={(on: boolean) => toggle(item, on)} />)}
    </div>
    <span sx={{ text: "bold", color: $packed.length === items.length ? "brand-green" : "muted" }}>
      {$packed.length === items.length ? "Bavul hazır, iyi yolculuklar!" : `${$packed.length} / ${items.length} eşya bavulda`}
    </span>
    {/* The master checkbox: its own icon (instead of the tick) and gold colour via m:color; indeterminate while
        some items are packed; onChange packs everything or empties the case. */}
    <Checkbox icon={sparkles} m:color="brand-gold" label="Bavulu tamamen hazırla" value={$packed.length === items.length}
      indeterminate={$packed.length > 0 && $packed.length < items.length} onChange={(on: boolean) => $packed = on ? [...items] : []} />
  </div>
}
