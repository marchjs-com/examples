import { Parallax } from "march/landing"
import { Button } from "march/ui"
import { arrowRight } from "march/icons"

// bir gezi sitesinin kampanya bandı: uzakta gün batımı fotoğrafı, önde tepeler, en önde başlık ve düğme
const Hills = () => <svg viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
  <path d="M0 300 C 200 220 380 290 600 240 S 980 220 1200 280 V400 H0 Z" fill="#2b1b3d" opacity=".85" />
</svg>

export function TravelBanner() {
  return <Parallax height="22rem" pointer={0.5} layers={[
    { src: "/media/dusk.jpg", alt: "Gün batımında vadi", speed: 0.4 },
    { content: <Hills />, speed: 0.1 },
  ]}>
    <div sx={{ flex: "col", gap: 2, p: 6 }} style={{ color: "#fff" }}>
      <strong sx={{ text: "2xl" }}>Kapadokya'da gün doğumu</strong>
      <span>3 gece, balon turu dahil · kişi başı 7.900 ₺</span>
      <Button iconEnd={arrowRight}>Turu incele</Button>
    </div>
  </Parallax>
}
