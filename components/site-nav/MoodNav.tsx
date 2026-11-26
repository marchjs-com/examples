// MoodNav: the creative-minimal SiteNav example.
//
// What it shows: a tiny navigation bar that is a mood picker. Pressing a link selects that mood, the pill stays on it, and
// the card below changes to match.
// When to use this pattern: when links drive state on the same page instead of going to another page. onNavigate tells
// you which link was chosen, and `active` marks the current one.
import { SiteNav } from "march/landing"
import { Card } from "march/ui"

// The moods: the href is the link target, the rest is what the card shows.
const MOODS = [
  { href: "#mood-sun", label: "Neşeli", face: "😄", text: "Bugün her şey yolunda." },
  { href: "#mood-tea", label: "Sakin", face: "🍵", text: "Bir çay, bir kitap." },
  { href: "#mood-fire", label: "Hırslı", face: "🔥", text: "Listeyi bitiriyoruz!" },
]

export function MoodNav() {
  // `let $mood` is a March signal holding the href of the chosen mood; `current` looks the mood up from it.
  let $mood = MOODS[0]!.href
  const current = () => MOODS.find((m) => m.href === $mood)!
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* SiteNav options used here:
        - mode="solid": a full-width bar (the default). sticky={false}: it does not stick to the top while scrolling, which
          suits a bar placed inside a page.
        - brand: a name and a mark; the mark can be an emoji.
        - links: { label, href, active }; `active` is a function, so the link for the chosen mood gets aria-current="page"
          and the pill rests on it. The pill (on by default) also slides under the hovered link and follows keyboard focus.
        - onNavigate(href): called when a link is chosen; here it changes the mood. */}
    <SiteNav mode="solid" sticky={false} brand={{ name: "Hâlim", mark: "🙂" }}
      links={MOODS.map((m) => ({ label: m.label, href: m.href, active: () => $mood === m.href }))}
      onNavigate={(href: string) => $mood = href} />
    <Card>
      {() => {
        // Read the signal inside a function, so the card is drawn again for the chosen mood.
        const m = current()
        return <div id={m.href.slice(1)} sx={{ flex: ["row", "center"], gap: 3, p: 4 }}>
          <span sx={{ text: "2xl" }}>{m.face}</span>
          <strong>{m.text}</strong>
        </div>
      }}
    </Card>
  </div>
}
