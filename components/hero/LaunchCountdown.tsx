import { Hero } from "march/landing"
import { sparkles } from "march/icons"

// fırlatmaya kalan gün: her basışta bir gün azalır, başlık ve vurgu birlikte değişir; sıfırda görünüm aurora olur
export function LaunchCountdown() {
  let $days = 3
  return <div>{() => { const days = $days; return <Hero variant={days > 0 ? "centered" : "aurora"} size="md" level={2}
    eyebrow={days > 0 ? `${days} gün kaldı` : "Yayında!"}
    title={days > 0 ? `Fırlatmaya ${days} gün` : "March yayında"} highlight={days > 0 ? `${days} gün` : "yayında"}
    lead="Sinyaller, derleyici ve bileşenler tek pakette."
    actions={[{ label: days > 0 ? "Bir gün ileri sar" : "Baştan başlat", icon: sparkles, onClick: () => $days = $days > 0 ? $days - 1 : 3 }]} /> }}</div>
}
