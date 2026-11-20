import { IconTile, Card } from "march/ui"
import { zap, shieldCheck, globe, packageBox } from "march/icons"

// bir ürün sayfasının özellik ızgarası: her özelliğin başında renkli ikon karosu, başlık ve kısa açıklama
const FEATURES = [
  { icon: zap, tone: "warn", title: "Hızlı", text: "Her sayfa ayrı yüklenir, ilk açılış küçük kalır." },
  { icon: shieldCheck, tone: "success", title: "Güvenli", text: "Sıkı CSP, satır içi betik yok." },
  { icon: globe, tone: "info", title: "Çok dilli", text: "Metinler çeviriyle gelir, sağdan sola da çalışır." },
  { icon: packageBox, tone: "violet", title: "Bağımlılıksız", text: "Tek paket, sıfır bağımlılık." },
] as const

// bir özellik: karo, başlık ve açıklama
const Feature = (props: { f: (typeof FEATURES)[number] }) => <div sx={{ flex: "col", gap: 2 }}>
  <IconTile icon={props.f.icon} tone={props.f.tone} size="lg" />
  <strong>{props.f.title}</strong>
  <span sx={{ color: "muted", text: "sm" }}>{props.f.text}</span>
</div>

export function FeatureGrid() {
  return <Card title="Neden March?">
    <div sx={{ grid: "fit", gap: 4 }}>{FEATURES.map((f) => <Feature f={f} />)}</div>
  </Card>
}
