// SeasonBar: the creative-minimal ActivityBar example.
//
// Four seasons as a horizontal bar: the indicator slides to the chosen season, and the card's colour and sentence
// change with it. It shows that ActivityBar is not only an editor rail: with orientation="horizontal" and
// collapsible={false} it is a compact, animated segmented choice. Use the pattern for any small "pick one of N" control
// that drives a themed area.
import { ActivityBar, Card } from "march/ui"

// Data first: one row per season. The `color` token is applied to the Card with m:color, so the whole card (and every
// component inside it) takes the season's colour. Adding a season means adding one row.
const SEASONS = [
  { id: "spring", label: "İlkbahar", icon: "🌸", color: "brand-pink", text: "Erik ağaçları çiçek açtı." },
  { id: "summer", label: "Yaz", icon: "☀️", color: "brand-orange", text: "Deniz ılık, gölge serin." },
  { id: "autumn", label: "Sonbahar", icon: "🍂", color: "brand-gold", text: "Yapraklar yere, kestaneler ateşe." },
  { id: "winter", label: "Kış", icon: "❄️", color: "brand-blue", text: "Sokaklar beyaz, çaylar demli." },
] as const

export function SeasonBar() {
  // The selected season id, and a function that finds its row. `now()` is a function (not a value) so every place
  // that calls it inside JSX is re-evaluated when $season changes.
  let $season = "spring"
  const now = () => SEASONS.find((s) => s.id === $season)!
  return <Card m:color={now().color}>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* orientation="horizontal": the bar lies flat. collapsible={false}: pressing the active season keeps it (a
          choice must always have a value). showLabels draws the season name under each icon, so tooltips={false}
          avoids repeating it on hover. The icons here are emoji strings, not icon-set icons. The indicator's slide is
          part of the component's motion and follows reduced motion and the global speed / "Stop all" settings.
          onChange: `id ?? $season` keeps the current value if the bar reports null. */}
      <ActivityBar label="Mevsimler" orientation="horizontal" collapsible={false} showLabels tooltips={false}
        items={SEASONS.map((s) => ({ id: s.id, label: s.label, icon: s.icon }))} value={$season} onChange={(id: string) => $season = id ?? $season} />
      <span sx={{ text: "lg", color: "primary" }}>{now().text}</span>
    </div>
  </Card>
}
