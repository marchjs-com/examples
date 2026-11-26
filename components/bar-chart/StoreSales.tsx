// StoreSales: the real-life BarChart example.
//
// Branch sales of a store chain: pick a quarter, and choose whether the shop and online sales sit side by side or on
// top of each other. Use this pattern for dashboards: a Card with a control in its header, a Toggle for the chart's
// mode and a chart that follows both.
import { BarChart } from "march/charts"
import { Card, Segmented, Toggle } from "march/ui"

// The branches, and a function that makes demo numbers for a quarter q: one row per branch with shop and online sales.
const BRANCHES = ["Kadıköy", "Beşiktaş", "Çankaya", "Alsancak", "Nilüfer"]
const sales = (q: number) => BRANCHES.map((sube, i) => ({ sube, dukkan: 180 + ((i * 53 + q * 37) % 9) * 40, online: 90 + ((i * 29 + q * 41) % 7) * 35 }))

export function StoreSales() {
  // The selected quarter (a string, because Segmented values are strings) and the stacked switch.
  let $q = "1"
  let $stacked = false
  // The Card's `actions` slot holds a Segmented control (bind:value keeps $q in sync; aria-label names the group for
  // screen readers). The Toggle's bind:value is the stacked switch.
  return <Card title="Şube satışları (bin ₺)" actions={[<Segmented size="sm" bind:value={$q} aria-label="Çeyrek" options={["1", "2", "3", "4"].map((q) => ({ value: q, label: `${q}. çeyrek` }))} />]}>
    <Toggle bind:value={$stacked} label="Üst üste göster" />
    {/* data is a function of $q, so changing the quarter redraws the chart. y lists two series and `series` maps their
        keys to legend labels. stacked follows the toggle; horizontal lays the bars down, which suits long branch
        names. animate="out" eases the bars to their new lengths (reduced motion and the global speed / "Stop all"
        settings are respected). format writes each value as a money text. */}
    <BarChart data={() => sales(Number($q))} x="sube" y={["dukkan", "online"]} series={{ dukkan: "Dükkân", online: "Çevrimiçi" }}
      stacked={$stacked} horizontal animate="out" format={(v: number) => `₺${v} B`} title="Şube satışları" height={260} />
  </Card>
}
