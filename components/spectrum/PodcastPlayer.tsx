import { Spectrum, Button, Card, Segmented } from "march/ui"
import { audioSource } from "march/audio"

// bir podcast oynatıcısı: bölüm çalarken frekanslar kartın altında akar; görünümü dinleyici seçer
export function PodcastPlayer() {
  const episode = audioSource("demo", { audible: true })
  let $look: "bars" | "mirror" | "line" = "mirror"
  return <Card title="Bölüm 12 · Sesin rengi" subtitle="Haftalık bilim sohbeti">
    <div sx={{ flex: "col", gap: 2 }}>
      <Spectrum source={episode} variant={$look} bars={40} minHz={40} maxHz={12000} height={96} label="Bölüm sesi" idleText="Duraklatıldı" />
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        <Button on:click={() => (episode.active() ? episode.stop() : episode.start())}>{() => (episode.active() ? "⏸ Duraklat" : "▶ Dinle")}</Button>
        <Segmented size="sm" bind:value={$look} aria-label="Görünüm" options={[{ value: "bars", label: "Çubuk" }, { value: "mirror", label: "Ayna" }, { value: "line", label: "Çizgi" }]} />
      </div>
    </div>
  </Card>
}
