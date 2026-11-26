// SpinnerLab: the full-featured Spinner example; it uses every prop at least once.
//
// Props shown here: size (sm, md, lg, em), label (a text or a function), decorative, colors ("brand", a list of colour tokens,
// "single"), color (one colour token) and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SpinnerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Spinner, Card, Button } from "march/ui"

// The three fixed sizes ("em" is shown separately: it follows the text).
const sizes = ["sm", "md", "lg"] as const

// A titled row of rings.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function SpinnerLab() {
  // `let $n` is a March signal: the button lowers it and the label of the last Spinner follows.
  let $n = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* size: sm, md (the default) or lg. label: the accessible name; every Spinner without `decorative` is a role="status"
        element, so the name tells screen readers what is loading. */}
    <Row title="Boyut">{sizes.map((s) => <Spinner size={s} label={`Boyut ${s}`} />)}</Row>
    {/* Colours: colors="brand" paints the ring with the brand colours; a list of colour tokens makes a ring of just those
        colours; colors="single" keeps it to one neutral colour even in a multicolour theme; color="..." gives one colour token.
        Without any of them the theme decides. class adds your own class (the tests use it). */}
    <Row title="Renkler">
      <Spinner colors="brand" label="Marka renkleri" />
      <Spinner colors={["brand-blue", "brand-green"]} label="İki renk" class="lab-pair" />
      <Spinner colors="single" label="Tek renk" />
      <Spinner color="brand-orange" label="Turuncu" class="lab-orange" />
    </Row>
    {/* size="em": the ring takes the size and the colour of the text around it (here a large purple line of text).
        decorative: no role and no label, hidden from assistive technology; use it where the text next to the ring already
        says what is happening. */}
    <Row title="Metin içinde (em) ve süs">
      <span sx={{ text: "lg", color: "brand-purple" }}><Spinner size="em" decorative class="lab-em" /> Yükleniyor…</span>
    </Row>
    {/* label as a function: the accessible name stays live, so it follows $n. */}
    <Row title="Ad erişimcisi">
      <Spinner label={() => `${$n} dosya kaldı`} class="lab-count" />
      <Button size="sm" on:click={() => $n = Math.max(0, $n - 1)}>Bir dosya bitti</Button>
    </Row>
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. Under
        reduced motion every ring keeps turning slowly instead of stopping (a still ring would read as stuck). */}
    <Card m:theme="night">
      <Row title="Koyu zemin">{sizes.map((s) => <Spinner size={s} colors="brand" />)}</Row>
    </Card>
  </div>
}
