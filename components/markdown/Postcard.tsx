// Postcard: the creative-minimal MarkdownEditor example.
//
// What it shows: a postcard written in Markdown. The editor opens on the "front" tab, which shows the rendered text on a
// dark card; the "back" tab is the Markdown source you edit.
// When to use this pattern: a small piece of writing with a formatted result, where a full editor would be too much. By
// renaming the two views, limiting the toolbar and hiding the statistics, the editor becomes a simple writing box.
//
// Accessibility: the views are a tablist (arrow keys, Home and End move between the tabs), the source is a labelled
// textarea and the preview is a focusable region. The toolbar is one tab stop with arrow-key navigation.
// Animation: none of its own.
import { MarkdownEditor, Card } from "march/ui"

export function Postcard() {
  // The Markdown source, a signal bound to the editor with bind:value.
  let $md = "**Selam** Ece!\n\nKapadokya'dan sevgiler. Balonlar *şafakta* kalkıyor:\n\n- sıcak çikolata\n- bol fotoğraf"
  // m:theme="night" (a common prop that works on every element) draws the card and the editor in the dark theme.
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: "lg", color: "brand-gold" }}>Kapadokya'dan kartpostal</span>
      {/* - views={["write", "preview"]}: only these two tabs are offered (the split and rich views are left out).
          - view="preview": the first view shown is the rendered text.
          - rows={6}: the height of the source box in lines. stats={false}: no word count and reading time.
          - toolbar: a list shows only those tools, in that order ("|" is a separator): bold, italic, bullet list.
          - labels: rename the tabs ("write" is the back of the card, "preview" the front). */}
      <MarkdownEditor bind:value={$md} views={["write", "preview"]} view="preview" rows={6} stats={false}
        toolbar={["bold", "italic", "|", "ul"]} labels={{ write: "Arka yüz", preview: "Ön yüz" }} />
    </div>
  </Card>
}
