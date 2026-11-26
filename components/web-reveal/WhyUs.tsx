// WhyUs: the real-life Reveal example.
//
// What it shows: the "why us" section of an online shop. The heading fades in first, then the three cards rise from
// below one after another when the section scrolls into view.
// When to use this pattern: landing-page sections where a gentle entrance guides the eye from the heading to the
// cards. Keep it subtle: one effect per page is usually enough.
import { Reveal } from "march/landing"
import { Card } from "march/ui"
import { truck, shieldCheck, refresh, Icon } from "march/icons"

const REASONS = [
  { icon: truck, title: "Ertesi gün kargo", text: "Saat 16.00'ya kadar verilen siparişler aynı gün yola çıkar." },
  { icon: shieldCheck, title: "Güvenli ödeme", text: "Kart bilgilerin bizde saklanmaz; 3D Secure ile öde." },
  { icon: refresh, title: "30 gün iade", text: "Beğenmezsen kargo ücreti ödemeden geri gönder." },
]

export function WhyUs() {
  return <section sx={{ flex: "col", gap: 4 }}>
    {/* First Reveal: it animates its own element instead of its children (`self`), here a heading (`as="h2"` chooses
        the tag, so the page keeps a real heading for screen readers). effect="fade" is a plain fade-in. */}
    <Reveal effect="fade" self as="h2" sx={{ text: "xl" }}>Neden bizden alışveriş?</Reveal>
    {/* Second Reveal: its children (the cards) enter one by one. effect="up" lifts each from below; stagger={120} is the
        delay in milliseconds between two cards; delay={150} waits a little before the first, so the heading comes
        first. The content is in the document from the start (screen readers can read it); the motion engine plays
        the effect, and reduced motion shows the cards at once. sx={{ grid: "fit" }} lays the cards out in a grid. */}
    <Reveal effect="up" stagger={120} delay={150} sx={{ grid: "fit", gap: 3 }}>
      {REASONS.map((r) => <Card>
        <div sx={{ flex: "col", gap: 2 }}>
          <Icon of={r.icon} />
          <strong>{r.title}</strong>
          <span sx={{ color: "muted" }}>{r.text}</span>
        </div>
      </Card>)}
    </Reveal>
  </section>
}
