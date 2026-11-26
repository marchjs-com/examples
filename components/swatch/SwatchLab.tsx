// SwatchLab: the full-featured Swatch example.
//
// What it shows: every Swatch option: kinds of colour (solid, gradient, transparent, a theme colour token), size, shape,
// the checkerboard under transparent colours, a clickable swatch (onClick + selected gives aria-pressed), the mark on the
// selected one (tick, icon or text), disabled, the role (radio gives aria-checked), content, a picture (label gives
// role="img") and decoration (no label), class / id / title / data-*, and the CHECKER class.
// Use it as a catalogue: copy the row you need.
//
// Animation: the hover motion of a swatch stops under the visitor's reduced-motion preference; nothing else moves.
// Accessibility: colour alone says nothing to a screen reader, so give a clickable swatch a `label`. A clickable swatch is
// a button (selected is announced as pressed); with role="radio" inside a radiogroup it is announced as checked; a static
// swatch with a label is an image, without one it is decoration.
import { Swatch, Card, CHECKER } from "march/ui"
import { heart } from "march/icons"

// The allowed sizes and shapes (one swatch is drawn for each), and a small palette of [colour, name] pairs.
const sizes = ["xs", "sm", "md", "lg"] as const
const shapes = ["round", "square", "circle"] as const
const palette: [string, string][] = [["#f2801f", "Turuncu"], ["#1d9ad6", "Mavi"], ["#78be3a", "Yeşil"]]

// A small layout helper: a caption above a wrapping row of swatches, so each group of options has a name on the page.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function SwatchLab() {
  // Reactive state: the chosen colour name, and the chosen size letter of the radio group.
  let $color = "Turuncu"
  let $size = "M"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* size: xs / sm / md / lg. */}
    <Row title="Boyut">{sizes.map((s) => <Swatch color="#1d9ad6" size={s} label={`Mavi (${s})`} />)}</Row>
    {/* shape: round (rounded corners), square, circle. */}
    <Row title="Biçim">{shapes.map((s) => <Swatch color="#a3338c" shape={s} label={`Mor (${s})`} />)}</Row>
    <Row title="Renk türleri">
      {/* color takes any CSS colour or gradient, or a colour token (brand-green). A transparent colour shows over a
          checkerboard by default; checker={false} draws it on a plain ground. A swatch with no label is decoration. */}
      <Swatch color="linear-gradient(135deg, #f2801f, #a3338c)" label="Gradyan" />
      <Swatch color="rgb(29 154 214 / .35)" label="Saydam, dama zeminli" />
      <Swatch color="rgb(29 154 214 / .35)" checker={false} label="Saydam, düz zemin" />
      <Swatch color="brand-green" label="Tema belirteci" />
      <Swatch color="#111827" />
    </Row>
    <Row title="Tıklanır (onClick + selected)">
      {/* onClick makes each swatch a button; selected draws the ring and is announced as pressed. A disabled swatch is a
          disabled button, so its onClick can never run. */}
      {palette.map(([c, name]) => <Swatch color={c} label={name} selected={$color === name} onClick={() => $color = name} />)}
      <Swatch color="#9ca3af" label="Tükendi" disabled onClick={() => $color = "Tükendi"} />
      <span>Seçili: {$color}</span>
    </Row>
    <Row title="Seçili işareti">
      {/* mark shows something on a selected swatch: true is a tick, or give an icon, or short text. */}
      <Swatch color="#78be3a" label="Tik" selected mark />
      <Swatch color="#f2801f" label="İkon" selected mark={heart} shape="circle" />
      <Swatch color="#1d9ad6" label="Metin" selected mark="1" />
    </Row>
    {/* Inside a radiogroup, role="radio" makes the selected state aria-checked. children (the letter) are drawn over the
        colour. */}
    <div role="radiogroup" aria-label="Beden">
      <Row title="Rol (radio) ve içerik">
        {["S", "M", "L"].map((b) => <Swatch color="#e5e7eb" role="radio" label={`Beden ${b}`} selected={$size === b} onClick={() => $size = b}>{b}</Swatch>)}
        <span>Beden: {$size}</span>
      </Row>
    </div>
    <Row title="Öznitelikler ve CHECKER">
      {/* id, class, title and data-* go to the swatch itself. CHECKER is the class of the shared checkerboard: put it on
          any element that shows transparency (here a plain box). */}
      <Swatch color="#f2801f" id="lab-swatch" class="lab-swatch" title="Kendi ipucum" data-code="F2801F" label="Öznitelikli" />
      <div class={CHECKER} sx={{ p: 4, radius: 2 }} role="img" aria-label="Dama zemini" />
    </Row>
    {/* m:theme="night" draws the card in the dark theme: the selected ring uses the text colour, so it stays visible. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">{palette.map(([c, name]) => <Swatch color={c} label={`Gece ${name}`} shape="circle" mark selected={$color === name} onClick={() => $color = name} />)}</Row>
    </Card>
  </div>
}
