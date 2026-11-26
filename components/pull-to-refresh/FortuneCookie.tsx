// FortuneCookie: the creative-minimal PullToRefresh example.
//
// What it shows: a fortune cookie. Pull the saying down (or focus the area and press the "new fortune" button) and a
// new saying appears after a short wait. When to use this pattern: a small area that loads fresh content on request.
//
// Keyboard: a visually hidden refresh button appears on focus, so refreshing works without a pointer. Animation: the
// spinning indicator and the spring back run on the motion engine; with reduced motion the indicator still spins
// (it reports progress) but the content snaps back; `settle={false}` snaps it always.

import { PullToRefresh, Card } from "march/ui"
import { sparkles } from "march/icons"

// The sayings. They are content, so they stay Turkish.
const SAYINGS = ["Bugün küçük bir adım büyük bir kapı açar.", "Bir fincan kahve iyi bir fikri çağırır.", "Beklemediğin bir mesaj seni gülümsetecek.", "Yarım kalan işini bitirmenin tam zamanı.", "Yeni bir dost kapıda."]

export function FortuneCookie() {
  // Index of the saying shown; each refresh adds one.
  let $n = 0
  return <Card title="🥠 Şans kurabiyesi">
    {/* PullToRefresh is itself the scroll area, so it needs a height: this wrapper gives it one. */}
    <div style={{ height: "160px" }}>
      {/* - icon: what turns inside the indicator (a sparkle instead of the refresh glyph).
          - m:color: the colour token of the indicator; labels.refresh renames the keyboard button.
          - onRefresh: returns a promise; the indicator keeps turning until it settles (here 0.7 s, then the next
            saying). */}
      <PullToRefresh icon={sparkles} m:color="brand-gold" labels={{ refresh: "Yeni şans" }}
        onRefresh={() => new Promise((ok) => setTimeout(ok, 700)).then(() => { $n++ })}>
        <p sx={{ text: ["lg", "center"], p: 4 }}>{() => SAYINGS[$n % SAYINGS.length]}</p>
        <p sx={{ text: ["sm", "center"], color: "muted" }}>Aşağı çekin</p>
      </PullToRefresh>
    </div>
  </Card>
}
