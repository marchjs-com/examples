import { ChoroplethMap } from "march/charts"
import { Button } from "march/ui"

// A coffee map: a playful, minimal ChoroplethMap on the built-in Turkey map.
// Every "Bir fincan daha" (one more cup) pours a cup in a random city, and that city's colour deepens from milk to
// espresso, flowing smoothly to the new shade. Use a choropleth whenever a number belongs to a place: sales per region,
// rainfall, votes, or cups of coffee.

// The cities the button can pick from. Rows find their province by name; case and Turkish letters do not matter.
const CITIES = ["İstanbul", "İzmir", "Ankara", "Trabzon", "Gaziantep", "Van"]

export function CoffeeMap() {
  // Cups per city; only two cities have coffee at first, the rest show the `noData` fill.
  let $cups: Record<string, number> = { "İstanbul": 3, "İzmir": 2 }
  // Adds one cup to a random city. The object is replaced, not mutated, so the signal notices the change.
  const pour = () => {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)]!
    $cups = { ...$cups, [city]: ($cups[city] ?? 0) + 1 }
  }
  // ChoroplethMap props:
  // - data: rows { id, value } built from $cups; these are the default keys, so no id / value props are needed.
  // - The built-in map is Turkey's 81 provinces (map="turkey", the default); map="turkey-regions" would draw the 7
  //   geographic regions instead, with rows naming regions ("Ege", "Karadeniz"). Your own `shapes` replace both.
  // - min={0}: the colour scale starts at zero cups (the default would start at the smallest count).
  // - colorScale={["#f5e6d3", "#6f4e37"]}: our own two-colour ramp, milk foam to coffee bean.
  // - noData="--m-surface-2": cities without coffee are a flat surface colour instead of the default hatch.
  // - labels="value": the cup count on each province, where it fits.
  // - zoom={false}: no wheel / pinch zoom, so scrolling the page never gets caught by the map.
  // - format: the value with a cup emoji, in tooltip, labels, legend and table.
  // - No `animate` prop: the default spring, so a new cup morphs the city's colour (mixed in OKLab, no muddy midpoint)
  //   and the provinces colour in as a west-to-east wave on the first draw. animate={false} switches motion off;
  //   reduced motion is honoured automatically.
  // Accessibility: title names the SVG, a hidden table lists every city with its cups, and Tab + the arrow keys move
  // between provinces.
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button size="sm" on:click={pour}>Bir fincan daha ☕</Button>
    <ChoroplethMap data={() => Object.entries($cups).map(([id, value]) => ({ id, value }))} min={0}
      colorScale={["#f5e6d3", "#6f4e37"]} noData="--m-surface-2" labels="value" zoom={false}
      format={(v: number) => `${v} ☕`} title="Kahve haritası" />
  </div>
}
