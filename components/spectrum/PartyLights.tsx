import { Spectrum, Button } from "march/ui"
import { audioSource } from "march/audio"

// parti ışıkları: müzik dört HADİ rengiyle bir halkanın çevresinde atar; bas yukarıdan başlar, tiz döner. Müzik
// başlamadan bir test tonu yanar (sayı kaynağı: izin ve tıklama istemez)
export function PartyLights() {
  const party = audioSource("demo", { audible: true })
  const tone = audioSource(() => 0.6)
  return <div sx={{ flex: ["col", "center"], gap: 2 }}>
    {() => <Spectrum source={party.active() ? party : tone} variant="circle" colors="brand" bars={72} gap={1} height={260} label="Parti ışıkları" />}
    <Button on:click={() => (party.active() ? party.stop() : party.start())}>{() => (party.active() ? "⏹ Sustur" : "🎶 Müziği başlat")}</Button>
  </div>
}
