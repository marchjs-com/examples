// VideoBackgroundLab: the full-featured VideoBackground example; it uses every prop at least once.
//
// Props shown here: src (the video), poster, tint and tintOpacity (the colour layer), position, controls (the pause
// button), icons and labels (for that button), class, and the content on top (children).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// VideoBackgroundLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { VideoBackground } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"
import { play, pause } from "march/icons"

// The choices of the tint control: the value goes to the `tint` prop, the label is what the visitor reads.
const TINTS = [{ value: "dark", label: "koyu" }, { value: "light", label: "açık" }, { value: "brand", label: "marka" }, { value: "none", label: "yok" }]

export function VideoBackgroundLab() {
  // Signals driven by the controls below.
  let $tint = "dark"
  let $strong = false
  let $controls = true
  let $top = false
  let $likes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The control panel. Segmented picks one of the tints (aria-label names the group for screen readers); the
        toggles switch the other options. bind:value keeps each signal and its control in sync both ways. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Renk katmanı" options={TINTS} bind:value={$tint} />
        <Toggle label="Güçlü katman" bind:value={$strong} />
        <Toggle label="Durdur düğmesi" bind:value={$controls} />
        <Toggle label="Üstü göster" bind:value={$top} />
      </div>
    </Card>
    {/* A function child is a live region: the VideoBackground is drawn again when a signal it reads changes. The props:
        - src / poster: the video and its first frame (the poster also stays for save-data and reduced motion).
        - tint: dark, light, brand or none (no layer); tintOpacity: the strength of the layer, 0 to 1.
        - position: the object-position of the video (which part stays in view when it is cropped).
        - controls: the pause / play button in the corner. icons: your own icons for it; labels: its accessible names.
        - class: an extra class on the root so CSS or a test can find this instance.
        The children are the content on top of the video; they stay clickable and readable. */}
    {() => {
      // The signals are read here, so a change redraws the video layer.
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
