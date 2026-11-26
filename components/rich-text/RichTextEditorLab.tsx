// RichTextEditorLab: the full-featured RichTextEditor example; it uses every prop at least once.
//
// Props shown here: value (bind:value and onChange), placeholder, toolbar (your own list), mentions (a list or an async
// search), emoji (your own set), shortcuts, history (shared undo), rows, counter, hint, api (write from outside),
// toolIcons, labels, class and readonly.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// RichTextEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { RichTextEditor, UndoRedo, Card, Badge, Button, CodeView } from "march/ui"
import type { RichTextApi } from "march/ui"

// People for the @ list: id, label and a hint.
const PEOPLE = [
  { id: "u1", label: "Ada Lovelace", hint: "Matematik" },
  { id: "u2", label: "Alan Turing", hint: "Bilgisayar" },
]
// Your own emoji set: [emoji, English shortcode, extra keywords]; typing : filters by them.
const EMOJI = [["🚀", "rocket", "roket hız"], ["🎉", "party", "kutlama"], ["✅", "done", "tamam bitti"]] as const

// An async search for mentions: it waits a little, as a request to a server would, then filters the people.
const lookup = async (q: string) => { await new Promise((r) => setTimeout(r, 50)); return PEOPLE.filter((p) => p.label.toLowerCase().includes(q.toLowerCase())) }

export function RichTextEditorLab() {
  // The Markdown text.
  let $md = "## Plan\n\n- **Ada** taslağı yazar\n- Alan gözden geçirir"
  // How many times onChange fired.
  let $changes = 0
  // The editor's api object (insert, setMarkdown, exec, history...), received through the `api` prop.
  let $api = null as RichTextApi | null
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
      {/* Buttons that use the api: insert text, replace everything, run a toolbar command; UndoRedo uses the editor's
          own history. */}
      <Button on:click={() => $api?.insert(" 🚀 **Hazır!**")}>Sona ekle</Button>
      <Button on:click={() => $api?.setMarkdown("## Sıfırdan")}>Baştan yaz</Button>
      <Button on:click={() => $api?.exec("bold")}>Kalın yap</Button>
      <UndoRedo history={$api?.history} size="sm" />
      <Badge tone="neutral">{`${$changes} değişiklik`}</Badge>
    </div>
    {/* The main editor:
        - bind:value and onChange: the Markdown text and a callback on every change; placeholder; rows: minimum height.
        - api: receives the object used by the buttons above; class: on the root (the tests use it).
        - toolbar: your own list of tools ("|" is a separator); mentions: a function that searches (it may return a
          promise);
          emoji: your own set for the : suggestions; shortcuts: Markdown block shortcuts while typing.
        - toolIcons: your own icon or short text for a tool; labels: every text the editor writes itself (the editor and
          toolbar
          names, the tool names, the hint and the counter function). */}
    <RichTextEditor bind:value={$md} onChange={() => $changes++} api={(a) => $api = a}
      placeholder="Planı yazın…" rows={5} class="lab-plan"
      toolbar={["h2", "bold", "italic", "link", "|", "ul", "ol", "|", "emoji", "undo", "redo"]}
      mentions={lookup} emoji={EMOJI} shortcuts
      toolIcons={{ bold: "K", italic: "İ" }}
      labels={{ editor: "Plan metni", toolbar: "Plan araçları", tools: { bold: "Kalın", italic: "Eğik", link: "Bağlantı" },
        hint: "@ ile kişi, : ile emoji", count: (w, c) => `${w} sözcük · ${c} harf` }} />
    {/* A second view of the same text on a dark surface (m:theme="night" works on every component). */}
    <Card m:theme="night">
      <div sx={{ flex: "col", gap: 2 }}>
        <span sx={{ text: "xs", color: "muted" }}>Aynı geçmiş (history), kısayolsuz, sayaçsız, salt okunur ön izleme</span>
        {/* A read-only preview that shares the first editor's undo history: readonly, no toolbar, no counter, no hint,
            no
            shortcuts and no emoji, with its own accessible name. It is drawn once the api exists. */}
        {() => $api && <RichTextEditor value={$md} readonly rows={2} toolbar={false} counter={false} hint={false} shortcuts={false}
          emoji={false} history={$api.history} aria-label="Plan ön izlemesi" />}
      </div>
    </Card>
    {/* The Markdown source, to see what the editor really stores. */}
    <CodeView code={() => $md} lang="md" label="Markdown" toolbar={false} />
  </div>
}
