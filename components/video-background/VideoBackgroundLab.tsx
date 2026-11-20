import { VideoBackground } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"
import { play, pause } from "march/icons"

// VideoBackground'un bütün özellikleri bir arada: video (src), afiş (poster), renk katmanı ve gücü, videonun konumu,
// durdur düğmesi, onun ikonları ve adları, sınıf ve üstteki içerik (children)
const TINTS = [{ value: "dark", label: "koyu" }, { value: "light", label: "açık" }, { value: "brand", label: "marka" }, { value: "none", label: "yok" }]

export function VideoBackgroundLab() {
  let $tint = "dark"
  let $strong = false
  let $controls = true
  let $top = false
  let $likes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Renk katmanı" options={TINTS} bind:value={$tint} />
        <Toggle label="Güçlü katman" bind:value={$strong} />
        <Toggle label="Durdur düğmesi" bind:value={$controls} />
        <Toggle label="Üstü göster" bind:value={$top} />
      </div>
    </Card>
    {() => {
      // sinyaller burada okunur: değişince video katmanı yeniden çizilir
      const tint = $tint, strong = $strong, controls = $controls, top = $top
      return <VideoBackground class="lab-vbg" src="/media/hadi-waves.webm" poster="/media/hadi-waves.jpg"
        tint={tint as "dark"} tintOpacity={strong ? 0.85 : 0.4} position={top ? "50% 0%" : "center"}
        controls={controls} icons={{ play, pause }} labels={{ play: "Oynat", pause: "Durdur" }}>
        <div sx={{ flex: "col", gap: 2, p: 6 }}>
          <strong sx={{ text: "xl" }}>Dalgaların üstünde</strong>
          <Button size="sm" on:click={() => $likes++}>Beğen ({$likes})</Button>
        </div>
      </VideoBackground>
    }}
  </div>
}
