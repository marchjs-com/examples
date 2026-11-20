import { FontPicker, Button, type FontChoice, type FontFamily } from "march/ui"

// FontPicker'ın bütün özellikleri, iki seçicide: satır içi olanda kendi listelerin (cihaz + web), örnek alanı ve
// parçaları, süzgeçler, favoriler, kendi satırın ve metinlerin; açılır olanda kendi düğmen, açık durumu, yeri ve girişi
const web = (family: string, category: FontFamily["category"], added: number): FontFamily => ({ family, category, source: "web", weights: [400, 700], italics: [400], subsets: ["latin", "latin-ext"], added })
const CATALOG = [web("Inter", "sans-serif", 3), web("Lora", "serif", 9), web("Fira Code", "monospace", 5), web("Pacifico", "handwriting", 1)]
const SYSTEM: FontFamily[] = [{ family: "Georgia", category: "serif", source: "system", weights: [400, 700], italics: [400, 700], subsets: [], stack: "Georgia, serif" }]
const LABELS = { list: "Yazı tipleri", search: "Yazı tipi ara", system: "Cihaz", web: "Kitaplık", favorites: "Gözdeler", empty: "Yok", count: (n: number) => `${n} aile` }

export function FontPickerLab() {
  let $font = "Lora"
  let $pick = "—"
  let $sample = "Pijamalı hasta yağız şoföre çabucak güvendi"
  let $favs = 0
  let $open = false
  let $title = "Georgia"
  return <div sx={{ flex: "col", gap: 3 }}>
    <span sx={{ text: "sm" }}>Seçim: {$pick} · gözde: {$favs} · panel: {$open ? "açık" : "kapalı"}</span>
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
    <FontPicker
      bind:value={$title} catalog={false} storageKey={false} closeOnPick
      open={$open} onOpenChange={(o: boolean) => $open = o}
      trigger={(api: { toggle(): void }) => <Button size="sm" on:click={() => api.toggle()}>Başlık yazısı: {$title}</Button>}
      size="sm" placement="bottom-end" motion="fade" disabled={false} name="title-font"
    />
  </div>
}
