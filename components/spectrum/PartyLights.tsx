import { Spectrum, Button } from "march/ui"
import { audioSource } from "march/audio"

// parti ışıkları: müzik dört HADİ rengiyle bir halkanın çevresinde atar; bas yukarıdan başlar, tiz döner
export function PartyLights() {
  const party = audioSource("demo", { audible: true })
  return <div sx={{ flex: ["col", "center"], gap: 2 }}>
    <Spectrum source={party} variant="circle" colors="brand" bars={72} gap={1} height={260} label="Parti ışıkları" idleText="Müziği başlat" />
    <Button on:click={() => (party.active() ? party.stop() : party.start())}>{() => (party.active() ? "⏹ Sustur" : "🎶 Müziği başlat")}</Button>
  </div>
}
