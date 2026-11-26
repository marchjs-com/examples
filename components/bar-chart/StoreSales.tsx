import { BarChart } from "march/charts"
import { Card, Segmented, Toggle } from "march/ui"

// StoreSales: a real-life report card. A store chain's branch sales per quarter, in the shop and online, side by side
// or stacked. Picking a quarter morphs the bars; the toggle switches grouped ↔ stacked and the bars glide there.
const BRANCHES = ["Kadıköy", "Beşiktaş", "Çankaya", "Alsancak", "Nilüfer"]
const sales = (q: number) => BRANCHES.map((sube, i) => ({ sube, dukkan: 180 + ((i * 53 + q * 37) % 9) * 40, online: 90 + ((i * 29 + q * 41) % 7) * 35 }))

export function StoreSales() {
  let $q = "1"
  let $stacked = false
  // The quarter and the stack toggle are bound to controls; the chart reads them reactively, nothing is rebuilt.
  return <Card title="Şube satışları (bin ₺)" actions={[<Segmented size="sm" bind:value={$q} aria-label="Çeyrek" options={["1", "2", "3", "4"].map((q) => ({ value: q, label: `${q}. çeyrek` }))} />]}>
    <Toggle bind:value={$stacked} label="Üst üste göster" />
    {/* horizontal: long branch names read better on the left. animate="out" is a calm easing for a report
        (reference marks need vertical bars). Keyboard: Tab, ↑ ↓ between branches, Enter selects. */}
    <BarChart data={() => sales(Number($q))} x="sube" y={["dukkan", "online"]} series={{ dukkan: "Dükkân", online: "Çevrimiçi" }}
      stacked={$stacked} horizontal animate="out" format={(v: number) => `₺${v} B`} title="Şube satışları" height={260} />
  </Card>
}
