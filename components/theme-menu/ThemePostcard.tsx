import { ThemeMenu, Card } from "march/ui"

// tema kartpostalı: kart kendi temasıyla çizilir (m:theme); menü yalnız bu kartın temasını seçer, sayfanınki yerinde kalır
export function ThemePostcard() {
  let $theme = "cream"
  return <Card m:theme={$theme}>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: ["xl", "bold"] }}>Selam, March!</span>
      <span sx={{ color: "muted" }}>Bu kartpostal "{$theme}" temasında yazıldı.</span>
      <ThemeMenu value={$theme} onChange={(id) => $theme = id} view="cards" current modes={false} accents={false} headings={false} />
    </div>
  </Card>
}
