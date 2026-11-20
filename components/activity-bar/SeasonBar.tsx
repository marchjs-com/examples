import { ActivityBar, Card } from "march/ui"

// dört mevsim: yatay bir çubuk, çizgi seçilen mevsime kayar; kartın rengi ve sözü mevsimle değişir
const SEASONS = [
  { id: "spring", label: "İlkbahar", icon: "🌸", color: "brand-pink", text: "Erik ağaçları çiçek açtı." },
  { id: "summer", label: "Yaz", icon: "☀️", color: "brand-orange", text: "Deniz ılık, gölge serin." },
  { id: "autumn", label: "Sonbahar", icon: "🍂", color: "brand-gold", text: "Yapraklar yere, kestaneler ateşe." },
  { id: "winter", label: "Kış", icon: "❄️", color: "brand-blue", text: "Sokaklar beyaz, çaylar demli." },
] as const

export function SeasonBar() {
  let $season = "spring"
  const now = () => SEASONS.find((s) => s.id === $season)!
  return <Card m:color={now().color}>
    <div sx={{ flex: "col", gap: 3 }}>
      <ActivityBar label="Mevsimler" orientation="horizontal" collapsible={false} showLabels tooltips={false}
        items={SEASONS.map((s) => ({ id: s.id, label: s.label, icon: s.icon }))} value={$season} onChange={(id: string) => $season = id ?? $season} />
      <span sx={{ text: "lg", color: "primary" }}>{now().text}</span>
    </div>
  </Card>
}
