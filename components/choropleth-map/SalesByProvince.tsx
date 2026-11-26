import { ChoroplethMap } from "march/charts"
import { Card, Segmented } from "march/ui"

// Orders by province: a real-life ChoroplethMap for an e-commerce dashboard.
// Each province is coloured by its order count in one of five classes; switching the period (this week / this month)
// makes the colours flow to their new classes, and a click on a province writes its name and count under the map.
// Use classes (`bins`) rather than a continuous ramp when readers should compare groups ("the top class") instead of
// reading exact shades, and when one big value (İstanbul) would otherwise wash out every other province.

// Weekly orders per province, keyed by plate code ("34" = İstanbul, "06" = Ankara…). Plate codes are the simplest
// stable id for Turkish provinces; names and ISO ids ("TR-34") work as well.
const BASE: [string, number][] = [["34", 4210], ["06", 1980], ["35", 1640], ["16", 920], ["07", 860], ["01", 610], ["42", 580], ["41", 540],
  ["27", 470], ["33", 450], ["55", 300], ["61", 260], ["26", 250], ["20", 240], ["38", 230], ["21", 190], ["65", 80], ["25", 110]]
// Scales the base counts by `k` (1 for the week, about 4.3 weeks for the month) and adds a small deterministic
// per-province factor (1.0–1.4), so the counts look less regular than the base list. Replace it with your own query.
const orders = (k: number) => BASE.map(([plate, n], i) => ({ plate, orders: Math.round(n * k * (1 + ((i * 7) % 5) / 10)) }))

export function SalesByProvince() {
  let $range = "week"  // the period, bound to the Segmented control
  let $picked = "—"    // the selected province, written by onSelect
  // The Segmented control goes into the Card's `actions` slot, so the period switch sits in the card header next to
  // the title. `aria-label` names the control for screen readers.
  //
  // ChoroplethMap props:
  // - data={() => …}: a function reading the signal, so a period switch recolours the map.
  // - id="plate" / value="orders": the province key (a plate code) and the value key.
  // - bins={5}: five classes of equal width between the smallest and largest count; the legend lists them.
  // - format="compact": short numbers (thousands abbreviated) in tooltip, legend and table.
  // - animate="out": an easing name instead of the default spring, so colours glide to their new classes without any
  //   bounce, which suits a dashboard. animate={false} recolours instantly; { duration: 400, easing: "out", stagger:
  //   20 } gives finer control. Reduced motion is honoured automatically.
  // - xLabel / yLabel: the region and value headers of the hidden table; yLabel also names the value in the tooltip.
  // - onSelect: called on click or Enter with { id, name, value, label, … }; `label` is the formatted value.
  // Keyboard: Tab focuses the map, the arrow keys move to the nearest province, Enter / Space select, Escape clears,
  // + / − / 0 zoom.
  return <Card title="İllere göre siparişler" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "week", label: "Bu hafta" }, { value: "month", label: "Bu ay" }]} />]}>
    <ChoroplethMap data={() => orders($range === "week" ? 1 : 4.3)} id="plate" value="orders" bins={5} format="compact"
      animate="out" title="Sipariş haritası" xLabel="İl" yLabel="Sipariş"
      onSelect={(p: { name: string; label: string }) => { $picked = `${p.name}: ${p.label}` }} />
    {/* The selection line: the function child re-renders when onSelect writes $picked. */}
    <p sx={{ text: "sm", color: "muted" }}>Seçilen il: {() => $picked}</p>
  </Card>
}
