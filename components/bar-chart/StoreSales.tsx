import { BarChart } from "march/charts"
import { Card, Segmented, Toggle } from "march/ui"

// mağaza zincirinin şube satışları: çeyrek seçilir, dükkân ve çevrimiçi yan yana ya da üst üste
const BRANCHES = ["Kadıköy", "Beşiktaş", "Çankaya", "Alsancak", "Nilüfer"]
const sales = (q: number) => BRANCHES.map((sube, i) => ({ sube, dukkan: 180 + ((i * 53 + q * 37) % 9) * 40, online: 90 + ((i * 29 + q * 41) % 7) * 35 }))

export function StoreSales() {
  let $q = "1"
  let $stacked = false
  return <Card title="Şube satışları (bin ₺)" actions={[<Segmented size="sm" bind:value={$q} aria-label="Çeyrek" options={["1", "2", "3", "4"].map((q) => ({ value: q, label: `${q}. çeyrek` }))} />]}>
    <Toggle bind:value={$stacked} label="Üst üste göster" />
    <BarChart data={() => sales(Number($q))} x="sube" y={["dukkan", "online"]} series={{ dukkan: "Dükkân", online: "Çevrimiçi" }}
      stacked={$stacked} horizontal animate="out" format={(v: number) => `₺${v} B`} title="Şube satışları" height={260} />
  </Card>
}
