import { ScrollToTop, Card } from "march/ui"

// asansör: kutu aşağı kaydıkça "çatıya çık" düğmesi kayarak gelir; basınca kutu yumuşakça en üst kata döner
const floors = ["Çatı katı · teras", ...Array.from({ length: 11 }, (_, i) => `${11 - i}. kat`), "Zemin kat · lobi"]

export function Elevator() {
  let $floor = floors[0] ?? ""
  const shaft = (<div style={{ height: "200px", overflow: "auto" }} on:scroll={(e: Event) => {
    const el = e.currentTarget as HTMLElement
    $floor = floors[Math.min(floors.length - 1, Math.round(el.scrollTop / 48))] ?? ""
  }}>
    {floors.map((f) => <div sx={{ p: 3, text: "md" }}>{f}</div>)}
  </div>) as HTMLElement
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "between", "center"], gap: 3, mb: 2 }}>
      <span sx={{ text: ["lg", "bold"], color: "brand-orange" }}>{$floor}</span>
      <ScrollToTop inline target={shaft} threshold={60} label="Çatıya çık" motion="slide" m:color="brand-orange" />
    </div>
    {shaft}
  </Card>
}
