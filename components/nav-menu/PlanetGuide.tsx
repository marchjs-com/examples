import { NavMenu } from "march/ui"

// gezegen rehberi: her gezegen bir sayfa, simgesi emoji; süzme kutusuna "kızıl" ya da "halka" yaz, anahtar sözcükler
// (keywords) gezegeni bulur. Bağlantılar bu sayfanın içinde kalır (#)
const at = (id: string) => `${location.pathname}#${id}`

export function PlanetGuide() {
  return <NavMenu brand={<strong>🪐 Güneş sistemi</strong>} label="Gezegen rehberi" palette={false} storageKey="ornek.gezegenler"
    labels={{ filterPlaceholder: "Gezegen ara… (kızıl, halka)" }} items={[
      { id: "mercury", title: "Merkür", href: at("mercury"), icon: "☿️", group: "İç gezegenler", keywords: "en küçük sıcak" },
      { id: "venus", title: "Venüs", href: at("venus"), icon: "♀️", group: "İç gezegenler", keywords: "çoban yıldızı parlak" },
      { id: "earth", title: "Dünya", href: at("earth"), icon: "🌍", group: "İç gezegenler", keywords: "ev mavi" },
      { id: "mars", title: "Mars", href: at("mars"), icon: "🔴", group: "İç gezegenler", keywords: "kızıl gezegen" },
      { id: "jupiter", title: "Jüpiter", href: at("jupiter"), icon: "🟠", group: "Dış gezegenler", keywords: "dev fırtına", badge: 95 },
      { id: "saturn", title: "Satürn", href: at("saturn"), icon: "🪐", group: "Dış gezegenler", keywords: "halka" },
      { id: "uranus", title: "Uranüs", href: at("uranus"), icon: "🧊", group: "Dış gezegenler", keywords: "buz yan yatmış" },
      { id: "neptune", title: "Neptün", href: at("neptune"), icon: "🔵", group: "Dış gezegenler", keywords: "rüzgar uzak" },
    ]} />
}
