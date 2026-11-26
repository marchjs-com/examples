// ShippingAddress: the real-life Combobox example.
//
// What it shows: the delivery address step of a checkout. Choosing a province fills the district list for that province;
// the district field stays disabled until a province is chosen, and "Continue" needs both.
// When to use this pattern: dependent fields. The second Combobox's `options` is computed from the first one's value,
// and changing the first resets the second so a stale pair can never be submitted.
// Keyboard: typing filters the list; arrow keys move, Enter picks, Escape closes. Wrap each Combobox in a Field so the
// label names the input for screen readers.
import { Combobox, Field, Button, Card, toast } from "march/ui"
import { truck } from "march/icons"

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
      {/* The province uses value + onChange (instead of bind:value) because the change must also reset the district. */}
      <Field label="İl" required>
        <Combobox value={$city} onChange={(c: string | string[] | null) => { $city = c as string | null; $town = null }} options={Object.keys(towns)} placeholder="İl seç" />
      </Field>
      {/* The district list comes from the chosen province (an empty list before that) and the field is disabled until
          then; the Field's help text tells the user what to do. */}
      <Field label="İlçe" required help={$city ? `${$city} ilçeleri` : "Önce il seç"}>
        <Combobox bind:value={$town} options={$city ? towns[$city] : []} disabled={!$city} placeholder="İlçe yaz" />
      </Field>
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={truck} disabled={!$town} on:click={() => toast(`Kargo adresi: ${$town}, ${$city}`)}>Devam et</Button>
      </div>
    </div>
  </Card>
}
