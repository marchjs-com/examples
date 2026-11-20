import { Combobox, Field, Button, Card, toast } from "march/ui"
import { truck } from "march/icons"

// ödeme adımı: teslimat adresi; il seçilince ilçe listesi o ile göre dolar, ikisi seçilmeden devam edilemez
const towns: Record<string, string[]> = {
  "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli", "Bakırköy", "Ataşehir", "Sarıyer"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut"],
  "İzmir": ["Konak", "Karşıyaka", "Bornova", "Buca", "Çeşme", "Urla"],
}

export function ShippingAddress() {
  let $city: string | null = null
  let $town: string | null = null
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: ["lg", "bold"] }}>Teslimat adresi</span>
      <Field label="İl" required>
        <Combobox value={$city} onChange={(c: string | string[] | null) => { $city = c as string | null; $town = null }} options={Object.keys(towns)} placeholder="İl seç" />
      </Field>
      <Field label="İlçe" required help={$city ? `${$city} ilçeleri` : "Önce il seç"}>
        <Combobox bind:value={$town} options={$city ? towns[$city] : []} disabled={!$city} placeholder="İlçe yaz" />
      </Field>
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={truck} disabled={!$town} on:click={() => toast(`Kargo adresi: ${$town}, ${$city}`)}>Devam et</Button>
      </div>
    </div>
  </Card>
}
