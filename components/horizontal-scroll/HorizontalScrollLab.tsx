import { HorizontalScroll } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"

// HorizontalScroll'un bütün özellikleri bir arada: panel genişliği, bölge adı, ilerleme çizgisi, sabitleme,
// sınıf ve içerik (children: paneller)
const WIDTHS = [{ value: "14rem", label: "dar" }, { value: "22rem", label: "orta" }, { value: "34rem", label: "geniş" }]

const Panel = (p: { n: number }) => <Card m:theme={p.n % 2 ? "night" : undefined}>
  <div sx={{ flex: "col", gap: 1 }} style={{ "min-height": "8rem" }}>
    <strong sx={{ text: "2xl" }}>{String(p.n).padStart(2, "0")}</strong>
    <span sx={{ color: "muted" }}>Panel {p.n}</span>
  </div>
</Card>

export function HorizontalScrollLab() {
  let $panel = "22rem"
  let $pinned = true
  let $progress = true
  let $count = 5
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Panel genişliği" options={WIDTHS} bind:value={$panel} />
        <Toggle label="Sabitle" bind:value={$pinned} />
        <Toggle label="İlerleme çizgisi" bind:value={$progress} />
        <Button size="sm" variant="secondary" on:click={() => $count = $count + 1}>Panel ekle</Button>
      </div>
    </Card>
    {() => {
      // sinyaller burada okunur: değişince şerit yeniden çizilir
      const panel = $panel, pinned = $pinned, progress = $progress, n = $count
      return <HorizontalScroll class="lab-hs" label={`${n} panelli şerit`} panel={panel} pinned={pinned} progress={progress}>
        {Array.from({ length: n }, (_, i) => <Panel n={i + 1} />)}
      </HorizontalScroll>
    }}
  </div>
}
