// AirplaneMode: the creative-minimal Toggle example.
//
// What it shows: a phone's connection settings. Turning on airplane mode switches Wi-Fi and Bluetooth off and locks
// them; turning it off brings them back to the state they had before.
// When to use this pattern: a switch that overrides other switches. The trick is to keep the user's own choice in
// its own signal ($wifi, $bluetooth) and only SHOW the combined value (own choice and not airplane mode), so nothing
// has to be saved and restored by hand.
import { Toggle, Card } from "march/ui"

export function AirplaneMode() {
  // `$` variables are signals: everything that reads them updates when they change.
  let $plane = false
  let $wifi = true
  let $bluetooth = false
  return <Card title={$plane ? "✈️ Uçak modu" : "📶 Bağlantılar"}>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* bind:value is the two-way binding. m:color is a common prop (every component takes it): the colour token of
          the track when the switch is on. A Toggle is a <button role="switch">, so Space and Enter toggle it and
          screen readers say "on" / "off"; the label wraps it, so clicking the text toggles it as well. */}
      <Toggle bind:value={$plane} m:color="brand-orange" label="Uçak modu" />
      {/* value + onChange is the one-way form: the switch shows `$wifi && !$plane` (so it looks off in airplane
          mode) while onChange only writes the user's own choice. `disabled` locks it while airplane mode is on. The
          thumb slides on the motion engine, so reduced motion and the global speed apply without code here. */}
      <Toggle value={$wifi && !$plane} onChange={(v: boolean) => $wifi = v} disabled={$plane} label="Wi-Fi" />
      <Toggle value={$bluetooth && !$plane} onChange={(v: boolean) => $bluetooth = v} disabled={$plane} m:color="brand-blue" label="Bluetooth" />
      <span sx={{ text: "sm", color: "muted" }}>{$plane ? "İyi uçuşlar, bağlantılar kapalı" : $wifi ? "Ev ağına bağlı" : "Çevrimdışı"}</span>
    </div>
  </Card>
}
