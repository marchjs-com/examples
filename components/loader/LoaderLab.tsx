// LoaderLab: the full-featured Loader example; it uses every prop at least once.
//
// Props shown here: text (a string or a function), label (a name only screen readers get), spinner (the default, your own
// node, or none), color, fade, overlay and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LoaderLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Accessibility: a Loader is role="status" with a polite live region (its text is announced once) and the spinner is
// decorative. The fade-in waits a moment, so a fast load never flashes a spinner; fade={false} shows it at once.
import { Loader, Card, Button } from "march/ui"
import { Icon, hourglass } from "march/icons"

// A small helper: a muted caption above whatever is passed as children. It only keeps the demo cases below labelled; it
// is not part of Loader.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function LoaderLab() {
  // A made-up progress percentage, a signal read by one of the loaders.
  let $pct = 30
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {/* text: a visible line under the spinner. class: for tests and your CSS (also below). */}
    <Box title="Görünür metin"><Loader text="Panolar hazırlanıyor…" class="lab-text" /></Box>
    {/* label: with no visible `text`, this is the name screen readers get (the default is a translated "Loading").
        fade={false}: it shows at once. */}
    <Box title="Yalnız okunan ad"><Loader label="Kullanıcılar açılıyor" class="lab-label" fade={false} /></Box>
    {/* text as a function: the line follows $pct, so the button makes it change. color: a colour token for the spinner. */}
    <Box title="Metin erişimcisi, renk">
      <Loader text={() => `%${$pct} tamam`} color="success" class="lab-pct" />
      <Button size="sm" on:click={() => $pct = $pct >= 100 ? 0 : $pct + 10}>İlerlet</Button>
    </Box>
    {/* spinner as a node: your own mark replaces the ring (here an hourglass icon). */}
    <Box title="Kendi işaretim"><Loader spinner={<Icon of={hourglass} size="xl" /> as Node} text="Kum saati" /></Box>
    {/* spinner={false}: no spinner at all, only the text. */}
    <Box title="Halkasız"><Loader spinner={false} text="Bir saniye…" class="lab-bare" /></Box>
    {/* overlay: the Loader covers its nearest positioned container (the box with position: relative) with a scrim,
        and the content underneath stays in place. */}
    <Box title="Perde (overlay)">
      <div style={{ position: "relative", width: "12rem", height: "6rem" }}>
        <p>Altta kalan içerik</p>
        <Loader overlay text="Kaydediliyor" class="lab-overlay" />
      </div>
    </Box>
    {/* The same on the dark theme: m:theme="night" is a common prop that sets the theme of the card and everything
        inside it; color gives the spinner a brand colour token. */}
    <Card m:theme="night"><Loader text="Koyu zeminde" color="brand-purple" /></Card>
  </div>
}
