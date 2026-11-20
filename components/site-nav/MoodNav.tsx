import { SiteNav } from "march/landing"
import { Card } from "march/ui"

// ruh hâli menüsü: bir bağlantıya basınca o hâl seçilir, hap üstünde durur ve aşağıdaki kart değişir
const MOODS = [
  { href: "#mood-sun", label: "Neşeli", face: "😄", text: "Bugün her şey yolunda." },
  { href: "#mood-tea", label: "Sakin", face: "🍵", text: "Bir çay, bir kitap." },
  { href: "#mood-fire", label: "Hırslı", face: "🔥", text: "Listeyi bitiriyoruz!" },
]

export function MoodNav() {
  let $mood = MOODS[0]!.href
  const current = () => MOODS.find((m) => m.href === $mood)!
  return <div sx={{ flex: "col", gap: 3 }}>
    <SiteNav mode="solid" sticky={false} brand={{ name: "Hâlim", mark: "🙂" }}
      links={MOODS.map((m) => ({ label: m.label, href: m.href, active: () => $mood === m.href }))}
      onNavigate={(href: string) => $mood = href} />
    <Card>
      {() => {
        const m = current()
        return <div id={m.href.slice(1)} sx={{ flex: ["row", "center"], gap: 3, p: 4 }}>
          <span sx={{ text: "2xl" }}>{m.face}</span>
          <strong>{m.text}</strong>
        </div>
      }}
    </Card>
  </div>
}
