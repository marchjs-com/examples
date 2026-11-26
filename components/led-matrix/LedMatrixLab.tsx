// LedMatrixLab: every LedMatrix prop in one place.
//
// One picture shown with every look: round LEDs, square pixels and glow tubes; gap, roundness, bloom, ghost, scanlines;
// the color modes; the three panels; a fixed size (cols / rows) bigger than the picture, and pitch.
import { LedMatrix, Card } from "march/ui"

// a smiling face with two colors from the palette ("y" yellow, "p" pink cheeks)
const FACE = ["..yyyy..", ".yyyyyy.", "yy.yy.yy", "yyyyyyyy", "pyyyyyyp", "yy....yy", ".yyyyyy.", "..yyyy.."]
const PALETTE = { y: "#ffd23f", p: "#ff6fb5" }

export function LedMatrixLab() {
  return <div sx={{ flex: "col", gap: 4 }}>
    <Card title="Biçimler">
      <div sx={{ flex: "row", gap: 3 }}>
        {/* shape: round (default), square (with roundness), tube. Every prop of the look is set here once. */}
        <LedMatrix class="lab-round" frame={FACE} palette={PALETTE} pitch={14} shape="round" gap={0.18} bloom={6} ghost={0.1} label="Gülen yüz" />
        <LedMatrix class="lab-square" frame={FACE} palette={PALETTE} pitch={14} shape="square" roundness={0.5} gap={0.1} bloom={false} label="Kare pikseller" />
        <LedMatrix class="lab-tube" frame={FACE} palette={PALETTE} pitch={14} shape="tube" bloom={12} scanlines label="Tüpler" />
      </div>
    </Card>
    <Card title="Renkler ve paneller">
      <div sx={{ flex: "row", gap: 3 }}>
        {/* color: "rgb" keeps the palette; a single color (amber, green, red, blue, white) or a theme token flattens it. */}
        <LedMatrix class="lab-amber" frame={FACE} palette={PALETTE} pitch={10} color="amber" label="Kehribar" />
        <LedMatrix class="lab-token" frame={FACE} palette={PALETTE} pitch={10} color="brand-purple" panel="theme" label="Tema rengi" />
        {/* cols / rows bigger than the picture: it is centered; panel="none" draws no housing; ghost={0} hides unlit LEDs. */}
        <LedMatrix class="lab-size" frame={FACE} palette={PALETTE} cols={14} rows={10} pitch={10} panel="none" ghost={0} label="Ortalanmış" />
      </div>
    </Card>
  </div>
}
