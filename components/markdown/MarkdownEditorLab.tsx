// MarkdownEditorLab: the full-featured MarkdownEditor example; it uses every prop at least once.
//
// Props shown here: value and onChange, rows, placeholder, view (the first view) and views (the offered views), the older
// preview form, toolbar (a list of tools) and icons (own icons), hint, labels (every text, including words and minutes),
// syncScroll, stats, split (the share of the source pane), class and readonly.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// MarkdownEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Accessibility: the views are a tablist, the source is a labelled textarea, the preview is a focusable region, and the
// toolbar is a role="toolbar" with one tab stop. The toolbar buttons keep the text selection and announce their shortcut.
import { MarkdownEditor, Card, Badge } from "march/ui"
import { bold, italic, link } from "march/icons"

// The starting Markdown: a heading, bold and italic text, and a task list.
const START = "## Toplantı\n\n**Perşembe** 10:00, _ana ofis_.\n\n- [x] Salon\n- [ ] Sunum"

export function MarkdownEditorLab() {
  // Signals: the Markdown text and a counter of edits.
  let $md = START
  let $edits = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Badge tone="neutral">{`${$edits} düzenleme`}</Badge>
    {/* The first editor, prop by prop:
        - value + onChange: the value is read from $md and every edit calls onChange with the new text (we store it and
          count it). The other way is bind:value.
        - rows: the height of the source box in lines. placeholder: the hint in an empty box.
        - view="write": the first view shown. views: the tabs offered, in order (all four here: write, split, preview,
          rich). split={0.6}: the source pane takes 60% of the split view. syncScroll={false}: the two panes of the
          split view do NOT scroll together.
        - class: added to the root, for tests and your CSS.
        - toolbar: a list shows only those tools in that order ("|" is a separator). icons: your own icon for a tool (a
          March icon, or text such as "H" for the heading tool).
        - labels: every text the editor writes itself: the tab names (write, preview, split, rich), the group names (view,
          formatting), the source field (source), the splitter (resize), the syntax hint (hint), the tool names (tools)
          and two functions: words(n) and minutes(n) for the footer statistics. */}
    <MarkdownEditor value={$md} onChange={(v) => { $md = v; $edits++ }} rows={6} placeholder="Notları yazın…"
      view="write" views={["write", "split", "preview", "rich"]} split={0.6} syncScroll={false} class="lab-md"
      toolbar={["h2", "bold", "italic", "|", "link", "task", "codeblock"]} icons={{ bold, italic, link, h2: "H" }}
      labels={{ write: "Yaz", preview: "Oku", split: "Yan yana", rich: "Biçimli", view: "Görünüm", formatting: "Biçim",
        source: "Kaynak", resize: "Bölmeyi taşı", hint: "**kalın**, _eğik_, - liste",
        tools: { bold: "Kalın", italic: "Eğik", link: "Bağlantı", h2: "Başlık", task: "Görev", codeblock: "Kod bloğu" },
        words: (n) => `${n} sözcük`, minutes: (n) => `${n} dk okuma` }} />
    {/* The second editor is a read-only copy on the dark theme (m:theme="night" on the card):
        - preview="split": the older form of `view`.
        - views: only write and split. toolbar={false}, hint={false}, stats={false}: no toolbar, no syntax hint, no
          word count. syncScroll: the panes scroll together (also the default).
        - readonly: the text can be read and scrolled but not changed. aria-label names it for screen readers. */}
    <Card m:theme="night">
      <div sx={{ flex: "col", gap: 2 }}>
        <span sx={{ text: "xs", color: "muted" }}>Eski preview="split", araçsız, ipucusuz, istatistiksiz, salt okunur</span>
        <MarkdownEditor value={$md} preview="split" views={["write", "split"]} toolbar={false} hint={false} stats={false} syncScroll readonly
          rows={4} aria-label="Salt okunur kopya" />
      </div>
    </Card>
  </div>
}
