// LiveStatusLab: the full-featured LiveStatus example; it uses every prop at least once.
//
// Props shown here: text (a string or a function), children, visible (shown, or only read by screen readers),
// politeness, as (span, div or p), help (text or a node) with helpId and helpClass, class and other attributes
// (id, data-*) that go to the status element.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LiveStatusLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Accessibility: LiveStatus is role="status" with aria-live: its text is read when it changes. Animation: none.
import { LiveStatus, Button, Card, Kbd } from "march/ui"

export function LiveStatusLab() {
  // A counter, a signal read by two of the statuses below.
  let $n = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $n++}>Bir tane ekle</Button>
      <Button size="sm" variant="ghost" on:click={() => $n = 0}>Sıfırla</Button>
    </div>
    {/* 1. The default: a polite status whose text is a function, so it is read whenever the count changes. class, id
          and data-kind are not LiveStatus props: they go to the status element itself. */}
    <LiveStatus text={() => `${$n} öğe eklendi`} class="lab-count" id="lab-count" data-kind="sayaç" />
    {/* 2. The text can also come as children. as="div" picks the element; politeness="assertive" makes the reader
          interrupt (keep it for errors and important messages). */}
    <LiveStatus as="div" politeness="assertive">Children ile söylenen, araya giren durum</LiveStatus>
    {/* 3. visible={false}: visually hidden but still read (it is clipped, not display: none), for changes sighted users
          already see. as="p" makes it a paragraph. */}
    <LiveStatus as="p" visible={false} text={() => `Gizli: ${$n}`} class="lab-hidden" />
    {/* 4. help: a hint line placed before the status; it can be text or a node (here a node with a Kbd inside). helpId
          is its id (so a widget can point at it with aria-describedby) and helpClass adds a class to it. */}
    <LiveStatus help={<span>Taşımak için <Kbd keys="space" /> tuşuna basın</span>} helpId="lab-help" helpClass="lab-help"
      text="Yardım satırı önce gelir" />
    {/* 5. The same on the dark theme: m:theme="night" is a common prop that sets the theme of the card and
          everything inside it. The text is a function again. */}
    <Card m:theme="night">
      <LiveStatus help="Koyu zeminde yardım" text={() => ($n > 2 ? "Çok eklendi!" : "Az eklendi")} />
    </Card>
  </div>
}
