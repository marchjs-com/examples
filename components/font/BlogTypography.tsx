// BlogTypography: the real-life FontPicker example.
//
// What it shows: blog settings with two separate pickers, one for headings (serif, bold) and one for body text (sans-serif),
// and a preview card that uses both. Before any web font is loaded from Google Fonts, the visitor is asked for permission.
// When to use this pattern: a theme or settings screen where each text role has its own font. Each picker keeps its own
// favourites and consent under its own `storageKey`.
// Privacy: with the default source the browser talks to Google when a font loads. `askConsent` waits for the visitor to
// press Allow first; until then names stay in the page's own font.
import { FontPicker, Card, type FontChoice, Field } from "march/ui"

// A tiny wrapper that puts a Field label (heading / body) over a picker.
const Setting = (props: { title: string; children?: unknown }) => <Field label={props.title}>{props.children}</Field>

export function BlogTypography() {
  // Two kinds of state per picker: the family name (the picker's value) and the CSS to apply (font-family stack, and for
  // headings the weight). The preview below reads the CSS values.
  let $head = "Georgia"
  let $body = "System UI"
  let $headCss = "Georgia, serif"
  let $headWeight = 700
  let $bodyCss = "system-ui, sans-serif"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      {/* Heading font. category="serif" shows serif families first; weight={700} is the weight chosen at first; storageKey keeps
          this picker's favourites, recent picks and consent answer separate from the other picker; askConsent: no request to the
          font source until the visitor presses Allow. onPick hands over the CSS stack and weight, which we store for the preview. */}
      <Setting title="Başlık">
        <FontPicker bind:value={$head} askConsent category="serif" weight={700} storageKey="blog.head"
          onPick={(c: FontChoice) => { $headCss = c.stack; $headWeight = c.weight }} />
      </Setting>
      {/* Body font: the same props with category="sans-serif" and its own storageKey; only the stack is needed here. */}
      <Setting title="Gövde">
        <FontPicker bind:value={$body} askConsent category="sans-serif" storageKey="blog.body" onPick={(c: FontChoice) => $bodyCss = c.stack} />
      </Setting>
    </div>
    {/* The preview: inline styles use the picked stacks, so the text changes as soon as a font is chosen. */}
    <Card>
      <h2 style={{ fontFamily: $headCss, fontWeight: String($headWeight) }}>Sinyallerle tanışın</h2>
      <p style={{ fontFamily: $bodyCss }}>Bileşenler bir kez çalışır; değişen yalnız ona bağlı metin ya da öznitelik olur. Böylece sayfa hızlı kalır.</p>
    </Card>
  </div>
}
