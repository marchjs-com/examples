// CommandPaletteLab: the full-featured CommandPalette example; it uses every prop at least once.
//
// Props shown here: ask (intent search) + askDelay + askIcon, your own commands, limit (most results), placeholder,
// shortcut, onRun, labels (your own texts), hint (your own key hint), empty (your own empty state, shown when there is no
// `ask`), class. Also the PaletteButton that opens the palette.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CommandPaletteLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CommandPalette, PaletteButton, Card, toast } from "march/ui"
import { bot, users, settings, globe } from "march/icons"

// Commands for this palette only (the app's own registered commands and pages are searched too). Each has an `id`, a
// `title` (searched and shown), a `group` (the heading it is listed under), an optional icon, `shortcut` (shown on
// the row), `keywords` (extra words that find it) and `run` (what happens on Enter).
const commands = [
  { id: "lab.team", title: "Ekip sayfası", group: "Gezinti", icon: users, run: () => {} },
  { id: "lab.settings", title: "Ayarları aç", group: "Gezinti", icon: settings, shortcut: "mod+,", run: () => {} },
  { id: "lab.site", title: "Siteyi yayınla", group: "Eylem", icon: globe, keywords: "deploy yayın", run: () => {} },
  { id: "lab.more1", title: "Rapor indir", group: "Eylem", run: () => {} },
  { id: "lab.more2", title: "Rapor paylaş", group: "Eylem", run: () => {} },
]
// A fake AI for `ask`: it receives the typed text and returns { results }, a list of command ids with a reason. Here
// every question that contains "ayar" suggests the settings command. A real app would call its own backend.
const ask = async (q: string) => ({ results: q.includes("ayar") ? [{ id: "lab.settings", reason: "Ayarlar burada" }] : [] })

export function CommandPaletteLab() {
  let $last = "henüz yok"
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* PaletteButton opens the palette and shows its shortcut; the shortcut it displays should match the one the
          palette listens for (below). Hovering or focusing it also loads the dialog ahead of time. */}
      <PaletteButton label="Laboratuvar paleti" shortcut="mod+shift+l" />
      <span sx={{ text: "sm", color: "muted" }}>Son çalışan: {$last}</span>
    </div>
    {/* The prop list, one by one:
        - ask / askDelay / askIcon: an "Ask" row runs the intent search on Enter, or by itself after 300 ms when the
          local results are weak; askIcon is its icon.
        - placeholder: the hint in the empty search field.
        - shortcut: the key that toggles this palette ("mod" is Ctrl or Command). The default is mod+k; false removes it.
        - limit={4}: at most four local results.
        - commands: the extra commands above. onRun receives the entry that ran (here a toast shows it).
        - labels: your own texts (dialog name, search field name, headings, ask texts); `ask` is a function of the
          query. Keep `dialog` and `search` meaningful: they are the accessible names.
        - hint: the key hint under the list (content, or false to hide it).
        - empty: what is shown when nothing matches (works when there is no `ask`).
        - class: added to the palette so a test or your CSS can find it. */}
    <CommandPalette
      ask={ask}
      askDelay={300}
      askIcon={bot}
      placeholder="Bir şey yaz: ayar, rapor, ekip…"
      shortcut="mod+shift+l"
      limit={4}
      commands={commands}
      onRun={(e: { title: string }) => { $last = e.title; toast(`Çalıştı: ${e.title}`) }}
      labels={{ dialog: "Laboratuvar paleti", search: "Laboratuvarda ara", results: "Bulunanlar", suggested: "Asistan öneriyor", asking: "Asistan düşünüyor…", askFailed: "Asistan yanıt vermedi", ask: (q: string) => `Asistana sor: ${q}` }}
      hint={<span>↑ ↓ gez · Enter çalıştır · Esc kapat</span>}
      empty={<span>Burada böyle bir şey yok</span>}
      class="lab-palette"
    />
  </Card>
}
