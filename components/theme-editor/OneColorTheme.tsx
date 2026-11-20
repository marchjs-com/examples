import { ThemeEditor, type ThemeDraft } from "march/components/theme-editor"

// tek renkten tema: sıfırdan başla, yalnız Renkler sekmesi; başlık taslağın ana rengiyle boyanır
export function OneColorTheme() {
  let $draft = null as ThemeDraft | null
  return <div sx={{ flex: "col", gap: 2 }}>
    <span sx={{ text: ["2xl", "bold"] }} style={{ color: $draft?.light.primary ?? "inherit" }}>Bir renk seç, tema hazır</span>
    <ThemeEditor bind:value={$draft} base="scratch" tabs={["colors"]} presets={false} applyButton={false} storageKey={false} share={false} warnUnsaved={false} />
  </div>
}
