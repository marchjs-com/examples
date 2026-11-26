// FontPickerLab: the full-featured FontPicker example; it uses every prop at least once.
//
// Props shown here, first picker (inline): view, bind:value, system, catalog, source, askConsent, load, onPick, weight, italic,
// preview, sample, onSample, category, sort, subset, search, categories, sorts, subsets, favorites, onFavorite, recent,
// specimen, sizeControl, styleControls, css, meta, count, deviceFonts, storageKey, renderRow, empty, labels, class,
// panelClass and aria-label. Second picker (popover): your own trigger button, open / onOpenChange, closeOnPick, size,
// placement, motion, disabled, name.
// Use it as a reference when you need one option: find the prop below and copy the line.
// FontPickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { FontPicker, Button, type FontChoice, type FontFamily } from "march/ui"

// A web font entry: family, category, source "web", the weights and italics available, subsets (for the subset filter) and
// `added` (used by the "newest" order). A real catalog would be much longer, or Google Fonts' list (the default).
const web = (family: string, category: FontFamily["category"], added: number): FontFamily => ({ family, category, source: "web", weights: [400, 700], italics: [400], subsets: ["latin", "latin-ext"], added })
// Our own small web catalog; passing an array as `catalog` replaces the default Google Fonts list.
const CATALOG = [web("Inter", "sans-serif", 3), web("Lora", "serif", 9), web("Fira Code", "monospace", 5), web("Pacifico", "handwriting", 1)]
// Our own list of device fonts; a `stack` is the CSS font-family value used to draw it.
const SYSTEM: FontFamily[] = [{ family: "Georgia", category: "serif", source: "system", weights: [400, 700], italics: [400, 700], subsets: [], stack: "Georgia, serif" }]
// labels replaces the built-in texts: group names, search label, the empty text and the count line (a function of the number).
const LABELS = { list: "Yazı tipleri", search: "Yazı tipi ara", system: "Cihaz", web: "Kitaplık", favorites: "Gözdeler", empty: "Yok", count: (n: number) => `${n} aile` }

export function FontPickerLab() {
  // State: the chosen family, the last pick, the sample text, how many favourites, and the open state of the second picker.
  let $font = "Lora"
  let $pick = "—"
  let $sample = "Pijamalı hasta yağız şoföre çabucak güvendi"
  let $favs = 0
  let $open = false
  let $title = "Georgia"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* A status line so you can see the callbacks fire (onPick, onFavorite, onOpenChange). */}
    <span sx={{ text: "sm" }}>Seçim: {$pick} · gözde: {$favs} · panel: {$open ? "açık" : "kapalı"}</span>
    {/* First picker: sits inline in the page instead of opening a popover.
        - system / catalog: your own device fonts and web fonts. source={false} never loads a web font, askConsent={false} skips
          the consent question, load={false}: the picker does not load the picked font (onPick gives its url if you want to).
        - onPick(choice): family, weight, italic... of every pick or style change. weight / italic: the style chosen at first.
        - preview="sample" draws each row with the sample text (editable by the visitor; onSample reports the edit).
        - category / sort / subset: what is shown first; categories / sorts / subsets: which choices the switchers offer.
        - search: the search field. favorites + onFavorite: stars and the Favourites group. recent={3}: three recent picks.
        - specimen, sizeControl, styleControls, css, meta, count: parts of the panel; each can be switched off with false.
        - deviceFonts={false}: no "fonts on this device" button. storageKey={false}: nothing is remembered.
        - renderRow: draw the inside of a row yourself (here a tick for the selected family). empty: text when nothing matches.
        - class / panelClass: hooks on the wrapper and the panel for CSS and tests. aria-label: the name of the picker. */}
    <FontPicker
      view="inline" bind:value={$font} system={SYSTEM} catalog={CATALOG} source={false} askConsent={false} load={false}
      onPick={(c: FontChoice) => $pick = `${c.family} ${c.weight}${c.italic ? " italik" : ""}`}
      weight={700} italic={false} preview="sample" sample={$sample} onSample={(t: string) => $sample = t}
      category="all" sort="newest" subset="all" search categories={["sans-serif", "serif", "monospace"]} sorts={["popular", "newest"]} subsets={["latin-ext"]}
      favorites onFavorite={(_f: string, on: boolean) => $favs += on ? 1 : -1} recent={3}
      specimen sizeControl styleControls css meta count deviceFonts={false} storageKey={false}
      renderRow={(f: FontFamily, st: { selected: boolean }) => <span>{st.selected ? "✓ " : ""}{f.family}</span>}
      empty="Hiçbiri tutmadı" labels={LABELS} class="lab-fp" panelClass="lab-fp-panel"
      aria-label="Laboratuvar yazı tipi"
    />
    {/* Second picker: a popover with your own trigger. `trigger` receives an api (toggle, open, close, font) so any element can
        open it. open + onOpenChange make the open state yours. closeOnPick closes after a choice. size is the default button's
        size, placement where the popover opens, motion="fade" its entrance ("none" turns it off; the motion engine honours
        reduced motion either way), name a form field name, disabled false keeps it usable. catalog={false} = device fonts only. */}
    <FontPicker
      bind:value={$title} catalog={false} storageKey={false} closeOnPick
      open={$open} onOpenChange={(o: boolean) => $open = o}
      trigger={(api: { toggle(): void }) => <Button size="sm" on:click={() => api.toggle()}>Başlık yazısı: {$title}</Button>}
      size="sm" placement="bottom-end" motion="fade" disabled={false} name="title-font"
    />
  </div>
}
