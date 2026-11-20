import { Breadcrumbs, Button } from "march/ui"

// hazine yolu: her adım yola bir durak ekler, ayraç ayak izi; geride kalan bir durağa basınca yol oraya kadar kısalır
const PLACES = [
  { id: "home", label: "Ev", icon: "🏠" },
  { id: "forest", label: "Orman", icon: "🌲" },
  { id: "river", label: "Nehir", icon: "🌊" },
  { id: "mountain", label: "Dağ", icon: "⛰️" },
  { id: "cave", label: "Mağara", icon: "🕯️" },
  { id: "treasure", label: "Hazine", icon: "💎" },
]

export function TreasureTrail() {
  let $steps = 1
  const done = () => $steps >= PLACES.length
  return <div sx={{ flex: "col", gap: 3 }}>
    <Breadcrumbs label="Yürüdüğün yol" separator="👣" items={() => PLACES.slice(0, $steps).map((p, i) => ({ ...p, onSelect: () => $steps = i + 1 }))} />
    <Button variant={done() ? "primary" : "secondary"} disabled={done()} on:click={() => $steps++}>
      {done() ? "Hazineyi buldun!" : `Bir adım daha: ${PLACES[$steps]?.label}`}
    </Button>
  </div>
}
