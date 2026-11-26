// ShippingAddress: the real-life Select example.
//
// What it shows: a delivery address form with dependent selects. Choosing a city fills the district list with that
// city's districts (a live option list), the district select stays disabled until a city is chosen, one carrier is not
// available today (a disabled option), and the save button waits until both city and district are set.
// When to use this pattern: any form where one choice limits the next one. Put a Select in a Field to get a visible
// label that is also the Select's accessible name.
import { Select, Field, Button, Card, toast } from "march/ui"
import { truck } from "march/icons"

// The districts of each city. A real page would load them from an API when the city changes.
const districts: Record<string, string[]> = {
  "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle"],
  "İzmir": ["Karşıyaka", "Bornova", "Konak"],
}
// Object options: `value` is what the Select holds, `label` the text; `disabled: true` shows an option that cannot be
// chosen (the label says why).
const carriers = [
  { value: "yurtici", label: "Yurtiçi Kargo" },
  { value: "aras", label: "Aras Kargo" },
  { value: "ptt", label: "PTT Kargo (bugün kapalı)", disabled: true },
]

export function ShippingAddress() {
  // `let $name` variables are March signals: bind:value writes them and everything that reads them redraws. `const $ready`
  // is a derived value: it is computed again whenever $city or $district changes and decides whether saving is possible.
  let $city = ""
  let $district = ""
  let $carrier = "yurtici"
  const $ready = !!$city && !!$district
  const save = () => toast(`${$district} / ${$city} adresine ${carriers.find((c) => c.value === $carrier)?.label} ile gönderilecek`, { kind: "success" })
  return <Card title="Teslimat adresi">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field wraps a Select and provides its visible label and the accessible name.
          The city Select: options is the list of city names; placeholder is the text of the empty first option; onChange
          clears the district so an old district never stays chosen for a new city. */}
      <Field label="İl"><Select bind:value={$city} options={Object.keys(districts)} placeholder="İl seç…" onChange={() => $district = ""} /></Field>
      <Field label="İlçe">
        {/* options as a function: the list is read again whenever $city changes, so it always shows the chosen city's
            districts (empty before a choice). The placeholder text and `disabled` also follow the city. */}
        <Select bind:value={$district} options={() => districts[$city] ?? []} placeholder={$city ? "İlçe seç…" : "Önce il seç"} disabled={!$city} />
      </Field>
      {/* placeholder={false}: no empty option, so a carrier is always chosen; the disabled PTT option cannot be picked. */}
      <Field label="Kargo firması"><Select bind:value={$carrier} options={carriers} placeholder={false} /></Field>
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={truck} disabled={!$ready} on:click={save}>Adresi kaydet</Button>
      </div>
    </div>
  </Card>
}
