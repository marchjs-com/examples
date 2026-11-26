// StatTileLab: the full-featured StatTile example.
//
// What it shows: every StatTile option in one place: value (text, number, node or accessor), label, hint, align, size,
// variant, order, onClick, href, disabled, term (a <dt> + <dd> inside a <dl>), hintIn, emphasis, partClass, class and
// extra attributes (id, data-*). Use it as a catalogue: copy the row that matches what you need.
//
// Animation: StatTile itself has no motion. The only change here is the value updating when the counter grows; it is a
// plain text update. Put a rolling number (CountRoll) in `value` if you want it animated: that runs on March's motion
// engine, so reduced motion, the global speed and "Stop all" apply.
// Accessibility: static tiles are read in order (value, label, hint); with `term` the label is read as the term and
// then the value. Tiles with onClick / href are a real button / link with a focus ring; `disabled` removes the button
// from the tab order.
import { StatTile, Card } from "march/ui"

// The four sizes the `size` prop accepts, in order. (`as const` keeps them as literal types for the prop.)
const sizes = ["sm", "md", "lg", "xl"] as const

// A small layout helper: a caption above a wrapping row of tiles, so each group of options has a name on the page.
// `children` is typed as unknown because it is only passed through to the DOM.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 2 }}>{props.children}</div>
</div>

export function StatTileLab() {
  // $n is reactive state: a `$` variable inside a component updates every place that reads it.
  let $n = 7
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Boyut ve görünüm">
      {/* size: sm / md / lg / xl scales the figure. variant: "tile" is a soft background, "plain" has none, "card" has a
          border and surface. */}
      {sizes.map((s) => <StatTile size={s} variant="tile" value={s} label="boyut" />)}
      <StatTile variant="plain" value="yalın" label="plain" />
      <StatTile variant="card" value="kart" label="card" />
    </Row>
    <Row title="Hizalama, sıra, ipucu">
      {/* align="start" with order="label" gives a left-aligned tile with the label above the value; the hint is its
          own line under them. */}
      <StatTile align="start" order="label" value="başta" label="önce etiket" hint="ipucu kendi satırında" variant="card" />
      {/* hintIn="value" moves the hint inside the value element, so it sits right after the figure. */}
      <StatTile align="end" value="sonda" label="sona hizalı" hint="ipucu değerin içinde" hintIn="value" variant="card" />
    </Row>
    <Row title="Düğme, bağlantı, kapalı">
      {/* onClick makes the tile a <button>. value={() => $n} is an accessor, so the figure follows $n. `class` is
          kept on the root (the tests find it); m:color tints the tile with a colour token. */}
      <StatTile class="lab-btn" value={() => $n} label="Bas, artsın" onClick={() => $n++} variant="tile" m:color="brand-orange" />
      {/* href makes it a link. */}
      <StatTile value="Rapor" label="bağlantı" href="#rapor" variant="tile" />
      {/* disabled: the handler never runs and the button cannot be focused. */}
      <StatTile value="Kapalı" label="kullanılamaz" onClick={() => $n += 100} disabled variant="tile" />
    </Row>
    {/* term renders <dt> (label) + <dd> (value), so it must sit in a <dl>. emphasis="text" makes the value read as body
        text that wraps, which suits a details list. partClass adds our own class to the value and label parts; id and
        data-* go to the root element. */}
    <dl class="lab-dl">
      <StatTile term value="Uzun bir değer metni: ayrıntı listesinde gövde metni gibi alt satıra geçer" label="Açıklama" emphasis="text" align="start"
        partClass={{ value: "lab-value", label: "lab-label" }} id="lab-term" data-kind="ayrıntı" />
    </dl>
    {/* m:theme="night" (a common prop) draws this subtree in the dark theme, to check the tile on a dark ground. */}
    <Card m:theme="night">
      <StatTile value={() => $n * 10} label="Koyu zeminde" hint="erişimci değer" />
    </Card>
  </div>
}
