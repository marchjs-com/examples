// PhoneCharge.tsx: the creative-minimal BatteryGauge example.
// A pretend phone: play a game to drain the battery, plug the charger in to fill it. The fill springs to each level,
// turns amber when low and red when critical, and a bolt appears while charging.
// Use this pattern for any "energy" value with states (a device, a game character's stamina, a budget left): the
// thresholds and the state event do the bookkeeping.
import { BatteryGauge, Button, Toggle, Card } from "march/ui"

export function PhoneCharge() {
  let $level = 64
  let $plugged = false
  // The last state change, from onStateChange (ok → low → critical and back).
  let $note = ""
  return <Card title="📱 Telefon">
    {/* value: the charge in percent. charging shows the bolt (instead of the inside percentage). low / critical: the
        thresholds of the amber and red states. size: the long side in px. The fill moves on a spring on the motion
        engine (a transform, so it never re-lays out the page); with reduced motion it stands on the level at once.
        The battery is a role="meter" whose spoken text says the state in words ("8%, critical"). */}
    <BatteryGauge value={$level} charging={$plugged} low={25} critical={10} size={140} label="Telefon pili"
      onStateChange={(s: string) => { $note = s === "critical" ? "Kritik! Şarja tak." : s === "low" ? "Pil azaldı." : "Pil iyi." }} />
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button on:click={() => { $level = Math.max(0, $level - ($plugged ? 0 : 13)) }}>🎮 Oyna</Button>
      <Button variant="ghost" on:click={() => { if ($plugged) $level = Math.min(100, $level + 20) }}>⚡ Şarj et (+20)</Button>
      {/* Toggle is a real switch (role="switch"), reachable with Tab and Space. */}
      <Toggle label="Şarj aleti takılı" bind:value={$plugged} />
    </div>
    {$note ? <b>{$note}</b> : null}
  </Card>
}
