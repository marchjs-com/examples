// MadeWithMarchLab: the full-featured MadeWithMarch example; it uses every prop at least once.
//
// Props shown here: variant (text, badge, small), heart (true, false, or your own mark), heartLabel, link (the text of
// the link), href (your own address), text ((link, heart) => your own sentence), class, and the common props m:color and
// m:theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// MadeWithMarchLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Accessibility: the heart is role="img" with an aria-label (heartLabel), and the link opens in a new tab. Animation: none.
import { MadeWithMarch, Card } from "march/ui"

// A small layout helper: a muted caption above whatever is passed as children. It only keeps the demo groups below
// labelled; it is not part of MadeWithMarch.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function MadeWithMarchLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Görünüm: text, badge, small">
      {/* The three variants: "text" (the default, a plain line), "badge" (a bordered pill) and "small" (a compact, muted
          line). class is added to the root so tests and your CSS can find an instance. */}
      <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
        <MadeWithMarch class="lab-text" />
        <MadeWithMarch variant="badge" class="lab-badge" />
        <MadeWithMarch variant="small" />
      </div>
    </Row>
    <Row title="Kalp: kendi işaretin ve adı, ya da hiç">
      {/* heart: your own mark instead of the default heart; heartLabel: its accessible name. heart={false}: no heart,
          the sentence ends at the link. */}
      <MadeWithMarch heart="☕" heartLabel="Kahve" class="lab-coffee" />
      <MadeWithMarch heart={false} class="lab-noheart" />
    </Row>
    <Row title="Kendi bağlantın ve cümlen">
      {/* link: the text of the link (default "MarchJS"); href: where it points (the default is March's own address).
          m:color is a common prop: it sets the colour token of the component. */}
      <MadeWithMarch link="March çatısı" href="https://marchjs.com" class="lab-link" m:color="brand-purple" />
      {/* text: build your own sentence. It receives the finished link and heart nodes, so you decide the word order
          (which is also how a translation can reorder them). */}
      <MadeWithMarch text={(link: unknown, heart: unknown) => <span>Bu sayfa {link} üzerine kuruldu {heart}</span>} heart="🚀" heartLabel="Roket" class="lab-own" />
    </Row>
    {/* The badge on the dark theme (m:theme="night" on the card) with another colour token. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <MadeWithMarch variant="badge" m:color="brand-orange" />
      </Row>
    </Card>
  </div>
}
