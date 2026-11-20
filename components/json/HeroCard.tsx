import { JsonEditor, Card, Badge } from "march/ui"

// oyun karakteri: JSON'u ağaçta değiştir, kart canlı güncellenir (ad, sınıf, seviye, can çubuğu)
type Hero = { name?: string; class?: string; level?: number; hp?: number }

export function HeroCard() {
  let $hero: unknown = { name: "Ayla", class: "Okçu", level: 7, hp: 64 }
  const $h = ($hero && typeof $hero === "object" ? $hero : {}) as Hero
  const $hp = Math.max(0, Math.min(100, Number($h.hp) || 0))
  return <div sx={{ flex: "col", gap: 2 }}>
    <Card m:theme="night">
      <div sx={{ flex: ["row", "center", "between"] }}>
        <span sx={{ text: "lg", color: "brand-gold" }}>{`${$h.name ?? "?"} · ${$h.class ?? "?"}`}</span>
        <Badge tone="info">{`Seviye ${$h.level ?? 0}`}</Badge>
      </div>
      <div role="meter" aria-label="Can" aria-valuenow={$hp} aria-valuemin={0} aria-valuemax={100}
        style={{ height: ".5rem", "margin-top": ".5rem", "border-radius": "1rem", width: `${$hp}%`, background: $hp > 30 ? "var(--m-success)" : "var(--m-danger)" }} />
    </Card>
    <JsonEditor bind:value={$hero} mode="tree" modes={["tree", "text"]} expand={1} rows={6} aria-label="Karakter" />
  </div>
}
