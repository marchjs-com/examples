// CheckMarkLab: the full-featured CheckMark example; it uses every prop at least once.
//
// Props shown here: value (true / false / "partial", or an accessor), labels, label (text or false = decorative),
// text (show the text), icons (your own glyphs, text or none), variant (plain, soft, solid, bare), size, motion (flip,
// fade, pop, draw, none, or your own function), class, other attributes and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CheckMarkLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CheckMark, Button, Card } from "march/ui"
import { heart, trash, more } from "march/icons"

const variants = ["plain", "soft", "solid", "bare"] as const
const sizes = ["sm", "md", "lg"] as const
const motions = ["flip", "fade", "pop", "draw", "none"] as const

// A small layout helper: a row of marks with its caption above. Only the Lab uses it, to group the options.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

// Your own transition for `motion`: it receives the arriving glyph (next) and the leaving one (prev) and returns a
// promise; the leaving glyph is removed when the promise settles. Here the new glyph slides down from above.
// Note: this one calls el.animate directly to keep the example short. In app code prefer `animate` from
// march/motion (see the CheckMark docs), so that reduced motion, global speed and "Stop all" also control it.
const slide = (next: HTMLElement, prev: HTMLElement) => {
  prev.style.opacity = "0"
  next.animate([{ transform: "translateY(-8px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 250 })
  return new Promise((done) => setTimeout(done, 250))
}

export function CheckMarkLab() {
  // One switch that drives the whole motion row, so every motion plays on the same change.
  let $on = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Value and text:
        - value: true = ✓, false = ✕, "partial" = –. The text a screen reader reads is Yes / No / Partly by default.
        - text: also show that text beside the mark (otherwise it is visually hidden but still read).
        - labels: your own wording per value (here Turkish).
        - label: the text of this one mark; class and data-* attributes go to the root element.
        - label={false}: the mark is decorative (aria-hidden); use it only when the text around it already says the
          same thing. */}
    <Row title="Değer ve metin">
      <CheckMark value text />
      <CheckMark value={false} text />
      <CheckMark value="partial" text />
      <CheckMark value text labels={{ yes: "Dahil", no: "Yok", partial: "Kısmen" }} />
      <CheckMark value label="Ödendi" text class="lab-paid" data-row="7" />
      <CheckMark value={false} label={false} class="lab-decor" />
    </Row>
    {/* variant: the glyph alone (plain), on a tinted disc (soft), on a filled disc (solid), or in the colour and
        text size of its surroundings (bare). Each mark gets its own label so screen readers can tell them apart. */}
    <Row title="Görünüm">{variants.map((v) => <CheckMark value variant={v} label={`Görünüm ${v}`} />)}</Row>
    {/* size: sm / md / lg. */}
    <Row title="Boyut">{sizes.map((s) => <CheckMark value="partial" variant="soft" size={s} label={`Boyut ${s}`} />)}</Row>
    {/* icons: your own glyph per value: an icon, a text/emoji, or false for none. m:color is the common prop that
        sets the colour token of the mark (without it the colour follows the value). */}
    <Row title="Kendi işaretleri">
      <CheckMark value icons={{ yes: heart, no: trash, partial: more }} m:color="brand-purple" variant="soft" />
      <CheckMark value={false} icons={{ no: "👎" }} />
      <CheckMark value icons={{ yes: false }} label="İşaretsiz evet" text />
    </Row>
    {/* motion: how the glyph changes when `value` changes. `value={() => $on}` is an accessor, so the mark follows
        the signal. The named motions run on the motion engine: reduced motion makes the glyph change at once and
        the global speed / "Stop all" settings apply. motion="none" (the default) switches without animation, and a
        function (slide above) replaces the animation completely. */}
    <Row title="Geçiş hareketi">
      <Button size="sm" on:click={() => $on = !$on}>{() => ($on ? "Hepsini kapat" : "Hepsini aç")}</Button>
      {motions.map((m) => <CheckMark value={() => $on} motion={m} variant="soft" text labels={{ yes: m, no: m }} />)}
      <CheckMark value={() => $on} motion={slide} variant="solid" label="Kendi hareketim" />
    </Row>
    {/* m:theme="night" draws this card in the dark theme whatever the page theme is, to check that every variant
        stays readable on a dark surface. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">{variants.map((v) => <CheckMark value={() => $on} variant={v} motion="pop" />)}</Row>
    </Card>
  </div>
}
