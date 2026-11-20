import { Splitter, Button } from "march/ui"

// Splitter'ın bütün özellikleri: start, end, initial, value (denetimli), onChange, orientation, min, label, handle
// (hazır, kendi işaretin ya da false: sabit), class
export function SplitterLab() {
  let $share = 0.3
  return <div sx={{ flex: "col", gap: 3 }}>
    <div style={{ "block-size": "8rem" }}>
      <Splitter class="lab-live" value={$share} onChange={(s: number) => $share = s} min={0.2} label="Denetimli pay"
        start={<div sx={{ p: 2 }}>Baş</div>} end={<div sx={{ p: 2 }}>Son</div>} />
    </div>
    <Button size="sm" on:click={() => $share = 0.7}>Payı %70 yap</Button>
    <span class="lab-share">%{Math.round($share * 100)}</span>
    <div style={{ "block-size": "8rem" }}>
      <Splitter class="lab-vert" orientation="vertical" initial={0.6} handle={<span>⋯</span>} label="Dikey pay"
        start={<div sx={{ p: 2 }}>Üst</div>} end={<div sx={{ p: 2 }}>Alt</div>} />
    </div>
    <div style={{ "block-size": "8rem" }}>
      <Splitter class="lab-fixed" initial={0.4} handle={false} start={<div sx={{ p: 2 }}>Sabit</div>} end={<div sx={{ p: 2 }}>Bölme</div>} />
    </div>
  </div>
}
