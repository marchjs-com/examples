import { StereoVu, Button, Card, Alert } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// PodcastMonitor: the real-life StereoVu example.
// The level check before a podcast recording: open the microphone and speak; the needles should swing around 0 VU,
// and a red light that stays on means you were too loud. It uses the studio line-up (0 VU = −18 dBFS) and latched
// peak lights that count the overs. Use this pattern in any recording, streaming or call app that should help people
// set their level before they start.
export function PodcastMonitor() {
  // The microphone is opt-in: audioSource("mic") asks for permission only when start() runs, from the button below.
  const mic = audioSource("mic")
  // The synthesized demo loop, for trying the meter without a microphone (silent: only the needles move).
  const demo = audioSource("demo")
  onCleanup(() => { mic.stop(); demo.stop() })
  // Which input the meter reads, how many times a light came on, and the microphone's error (denied, unsupported).
  let $input: "mic" | "demo" | null = null
  let $overs = 0
  let $error: string | null = null
  async function open(which: "mic" | "demo") {
    const src = which === "mic" ? mic : demo
    await src.start()
    $error = src.error()
    if (src.active()) $input = which
  }
  return <Card title="Kayıt öncesi ses kontrolü">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      {/* The meter pair.
          - source: the microphone or the demo, whichever was opened (no source: the needles rest at the left).
          - reference={0.126}: the level that reads 0 VU, here −18 dBFS, the usual studio line-up. Speech that swings
            around 0 VU then leaves room before the digital ceiling.
          - peak={3}: a light comes on at +3 VU; peakHold={0} latches it until it is pressed (each light is a button
            named from peakLabel and the channel name, set by peakLabel and channelNames).
          - onPeak(channel): counts the overs. panel="dark": a black console look.
          Motion: VU ballistics on the motion engine; reduced motion shows each reading without the swing. */}
      <StereoVu source={$input === "mic" ? mic : $input === "demo" ? demo : undefined} reference={0.126} peak={3} peakHold={0}
        panel="dark" label="Mikrofon seviyesi" channelNames={["sol", "sağ"]} peakLabel="Söndür" onPeak={() => { $overs++ }} />
      {/* The verdict in words: a meter that only flashes would leave screen-reader users and quick readers guessing. */}
      {$overs > 0
        ? <Alert tone="warn">Çok yüksek ({$overs} kez): mikrofondan biraz uzaklaşın ya da kazancı düşürün.</Alert>
        : <span sx={{ text: "sm", color: "muted" }}>İbreler 0 VU çevresinde sallanmalı.</span>}
      {$error && <Alert tone="danger">Mikrofon açılamadı: {$error}</Alert>}
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        {/* Ordinary Buttons: the microphone only after this explicit press. */}
        <Button on:click={() => open("mic")}>🎙 Mikrofonu aç</Button>
        <Button variant="ghost" on:click={() => open("demo")}>▶ Demo ile dene</Button>
        <Button variant="ghost" on:click={() => { $overs = 0 }}>Sayacı sıfırla</Button>
      </div>
    </div>
  </Card>
}
