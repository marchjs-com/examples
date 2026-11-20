import { Select, Field, Button, Card, toast } from "march/ui"
import { truck } from "march/icons"

// sipariş adresi: il seçilince ilçe listesi o ile göre dolar (canlı şıklar); kargo firmalarından biri bugün kapalı
const districts: Record<string, string[]> = {
  "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle"],
  "İzmir": ["Karşıyaka", "Bornova", "Konak"],
}
const carriers = [
  { value: "yurtici", label: "Yurtiçi Kargo" },
  { value: "aras", label: "Aras Kargo" },
  { value: "ptt", label: "PTT Kargo (bugün kapalı)", disabled: true },
]

export function ShippingAddress() {
  let $city = ""
  let $district = ""
  let $carrier = "yurtici"
  const $ready = !!$city && !!$district
  const save = () => toast(`${$district} / ${$city} adresine ${carriers.find((c) => c.value === $carrier)?.label} ile gönderilecek`, { kind: "success" })
  return <Card title="Teslimat adresi">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="İl"><Select bind:value={$city} options={Object.keys(districts)} placeholder="İl seç…" onChange={() => $district = ""} /></Field>
      <Field label="İlçe">
        <Select bind:value={$district} options={() => districts[$city] ?? []} placeholder={$city ? "İlçe seç…" : "Önce il seç"} disabled={!$city} />
      </Field>
      <Field label="Kargo firması"><Select bind:value={$carrier} options={carriers} placeholder={false} /></Field>
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={truck} disabled={!$ready} on:click={save}>Adresi kaydet</Button>
      </div>
    </div>
  </Card>
}
