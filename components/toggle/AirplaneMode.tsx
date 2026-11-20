import { Toggle, Card } from "march/ui"

// uçak modu: açınca Wi-Fi ve Bluetooth kapanır ve kilitlenir; kapatınca eski hallerine döner
export function AirplaneMode() {
  let $plane = false
  let $wifi = true
  let $bluetooth = false
  return <Card title={$plane ? "✈️ Uçak modu" : "📶 Bağlantılar"}>
    <div sx={{ flex: "col", gap: 2 }}>
      <Toggle bind:value={$plane} m:color="brand-orange" label="Uçak modu" />
      <Toggle value={$wifi && !$plane} onChange={(v: boolean) => $wifi = v} disabled={$plane} label="Wi-Fi" />
      <Toggle value={$bluetooth && !$plane} onChange={(v: boolean) => $bluetooth = v} disabled={$plane} m:color="brand-blue" label="Bluetooth" />
      <span sx={{ text: "sm", color: "muted" }}>{$plane ? "İyi uçuşlar, bağlantılar kapalı" : $wifi ? "Ev ağına bağlı" : "Çevrimdışı"}</span>
    </div>
  </Card>
}
