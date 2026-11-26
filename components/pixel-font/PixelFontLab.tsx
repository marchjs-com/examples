// PixelFontLab: every PixelFont prop in one place, and the layout helpers.
//
// The two fonts with the whole Turkish alphabet; spacing, ink, cols / align / margin; the LED look; and textWidth /
// wrapText, which tell you how wide a text is in LEDs and how it breaks into lines (useful for your own LED drawings).
import { PixelFont, textWidth, wrapText } from "march/led"
import { Card } from "march/ui"

const ALPHABET = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"

export function PixelFontLab() {
  return <div sx={{ flex: "col", gap: 4 }}>
    <Card title="Yazı tipleri">
      <div sx={{ flex: "col", gap: 2 }}>
        {/* font: "5x7" (default) and "8x8" (each letter one column bolder). */}
        <PixelFont class="lab-5x7" text={ALPHABET} pitch={4} color="amber" />
        <PixelFont class="lab-8x8" text={ALPHABET} font="8x8" pitch={4} color="green" />
        <PixelFont text={ALPHABET.toLocaleLowerCase("tr")} pitch={4} color="blue" />
      </div>
    </Card>
    <Card title="Tüm özellikler">
      <div sx={{ flex: "col", gap: 2 }}>
        {/* spacing: LEDs between letters; ink: the letters' color (emoji keep theirs); cols + align + margin: a fixed
            screen with the text at its end; the LED look props; label overrides the spoken text. */}
        <PixelFont class="lab-all" text="₺ 1.250 :check:" font="5x7" spacing={2} ink="#3ddc84" cols={60} align="end" margin={2}
          shape="square" gap={0.1} roundness={0.4} bloom={4} ghost={0.15} scanlines color="rgb" panel="theme" pitch={5} label="Bakiye 1.250 lira" />
      </div>
    </Card>
    <Card title="Yardımcılar">
      {/* textWidth("…") is the width in LEDs; wrapText(text, cols) breaks it into lines that fit a 30-LED screen. */}
      <div class="lab-help" sx={{ flex: "col", gap: 1 }}>
        <span>{`"HADİ" genişliği: ${textWidth("HADİ")} LED`}</span>
        {wrapText("HADİ'ye hoş geldin, iyi eğlenceler", 30).map((l) => <PixelFont text={l} pitch={4} color="blue" />)}
      </div>
    </Card>
  </div>
}
