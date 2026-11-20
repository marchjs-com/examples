import { ResizeHandle } from "march/ui"

// ResizeHandle'ın özellikleri: value + set (tam ayırıcı), min, max, step, reset, edge, label, line, grip, disabled,
// onStep (köşe ve yalnız gösterge kipi), class
export function ResizeHandleLab() {
  let $w = 200
  let $steps = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div class="m-card" style={{ position: "relative", "inline-size": `${$w}px`, "block-size": "80px" }}>
      <ResizeHandle class="lab-full" value={() => $w} set={(w: number) => $w = w} min={150} max={300} step={10} reset={() => $w = 200} label="Genişlik" grip />
    </div>
    <span class="lab-w">{$w} px</span>
    <div class="m-card" style={{ position: "relative", "inline-size": "200px", "block-size": "80px" }}>
      <ResizeHandle class="lab-corner" edge="bottom-end" label="Köşe" onStep={() => $steps++} line="always" />
      <ResizeHandle class="lab-off" edge="bottom" label="Kapalı" disabled grip={false} />
    </div>
    <span class="lab-steps">{$steps} adım</span>
  </div>
}
