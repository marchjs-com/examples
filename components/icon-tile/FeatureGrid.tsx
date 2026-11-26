// FeatureGrid: the real-life IconTile example.
//
// What it shows: the feature grid of a product page. Each feature starts with a coloured icon tile, then a title and a short
// description.
// When to use this pattern: icon + heading + text blocks. The tile gives each feature its colour through `tone` (one of nine
// named tones, each meant for a meaning such as success or warning) and stays decorative, because the heading names the
// feature.
import { IconTile, Card } from "march/ui"
import { zap, shieldCheck, globe, packageBox } from "march/icons"

// The features: an icon, a tone and the texts. `as const` keeps the tones as literals so IconTile accepts them.
const FEATURES = [
  { icon: zap, tone: "warn", title: "Hızlı", text: "Her sayfa ayrı yüklenir, ilk açılış küçük kalır." },
  { icon: shieldCheck, tone: "success", title: "Güvenli", text: "Sıkı CSP, satır içi betik yok." },
  { icon: globe, tone: "info", title: "Çok dilli", text: "Metinler çeviriyle gelir, sağdan sola da çalışır." },
  { icon: packageBox, tone: "violet", title: "Bağımlılıksız", text: "Tek paket, sıfır bağımlılık." },
] as const

// One feature: the tile, a title and a description.
const Feature = (props: { f: (typeof FEATURES)[number] }) => <div sx={{ flex: "col", gap: 2 }}>
  {/* size="lg": the large tile. No `label`, so it is aria-hidden: the heading beside it is the name. */}
  <IconTile icon={props.f.icon} tone={props.f.tone} size="lg" />
  <strong>{props.f.title}</strong>
  <span sx={{ color: "muted", text: "sm" }}>{props.f.text}</span>
</div>

export function FeatureGrid() {
  return <Card title="Neden March?">
    {/* grid: "fit" lays the features out in as many columns as fit; gap sets the spacing. */}
    <div sx={{ grid: "fit", gap: 4 }}>{FEATURES.map((f) => <Feature f={f} />)}</div>
  </Card>
}
