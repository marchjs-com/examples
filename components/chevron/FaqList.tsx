// FaqList: the real-life Chevron example.
//
// What it shows: the frequently asked questions of a running club. Each question is a button that carries
// aria-expanded; the Chevron at its end turns by itself, and the answer is drawn only while it is open.
// When to use this pattern: your own disclosure rows. For a ready-made one with animated panels and keyboard
// navigation use Accordion; use Chevron directly when you build a custom header or a tree row.
// Accessibility: the button holds the state (aria-expanded), so screen readers hear "expanded" / "collapsed"; the
// arrow is only decoration. Motion: the arrow turns smoothly; reduced motion turns the turn off. Pass motion={false}
// to the Chevron to make it jump.
import { Card, Button, Chevron } from "march/ui"

const faqs = [
  { q: "Üyelik ücretli mi?", a: "Hayır. Koşulara katılmak ücretsiz; yalnızca yarış kayıtları ücretlidir." },
  { q: "Hangi günler koşuyoruz?", a: "Salı ve perşembe 19.00'da, cumartesi 09.00'da Moda sahilinde." },
  { q: "Yeni başlayanlar katılabilir mi?", a: "Elbette. Her koşuda tempoyu düşük tutan bir rehber grup var." },
]

// One question with its own open / closed state, so every row opens and closes independently.
const Faq = (props: { q: string; a: string }) => {
  let $open = false
  return <div sx={{ flex: "col", gap: 1 }}>
    {/* The Chevron gets no `open` prop: it finds the nearest ancestor with aria-expanded (this button) and follows
        it, so the state is written once. direction="down" makes it point down when closed and up when open. */}
    <Button variant="ghost" block aria-expanded={$open ? "true" : "false"} on:click={() => $open = !$open}>
      <span sx={{ flex: ["row", "between"], w: "full" }}>{props.q} <Chevron direction="down" /></span>
    </Button>
    {$open ? <p sx={{ px: 3, color: "muted" }}>{props.a}</p> : null}
  </div>
}

export function FaqList() {
  return <Card title="Sık sorulanlar">
    <div sx={{ flex: "col", gap: 1 }}>{faqs.map((f) => <Faq q={f.q} a={f.a} />)}</div>
  </Card>
}
