// TravelBanner: the real-life Parallax example.
//
// A campaign banner for a travel site: a sunset photo far away, hills in front of it, and at the very front the headline
// and a button. Scrolling and a light pointer movement shift the layers by depth. Use this pattern for a landing-page
// hero where a photo and a shape give a feeling of depth behind real content.
import { Parallax } from "march/landing"
import { Button } from "march/ui"
import { arrowRight } from "march/icons"

// A hills shape drawn as an inline SVG: it stretches to the layer (preserveAspectRatio="none") and is decoration
// (aria-hidden).
const Hills = () => <svg viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
  <path d="M0 300 C 200 220 380 290 600 240 S 980 220 1200 280 V400 H0 Z" fill="#2b1b3d" opacity=".85" />
</svg>

export function TravelBanner() {
  // - height: the minimum height of the banner. pointer={0.5}: a gentle mouse effect (0 would turn it off).
  // - layers: the first is the farthest. The photo has src + alt, so it is meaningful for screen readers (the alt
  //   text is read). speed: positive means slower than the page, so the photo looks far away (0.4) and the hills move
  //   less (0.1). The layers get extra room to travel, so no edge shows.
  // - children: the text and the button, drawn in front of the layers, so they stay readable and clickable.
  // Under reduced motion every layer stays still; the scroll effect pauses while the banner is off screen.
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
