// OneColorTheme: the creative-minimal ThemeEditor example.
//
// What it shows: a theme from one colour. The editor starts from scratch with only the Colors tab and nothing else (no base
// theme row, no apply button, no storage, no share link, no unsaved-changes warning), and the headline above it is painted
// with the draft's main colour, so picking a colour changes the page at once.
// When to use this pattern: the smallest ThemeEditor: switch off what you do not need and read the draft with bind:value. The
// draft is plain data (JSON-safe), so `$draft.light.primary` is simply the main colour of the light mode.
//
// Animation: none of its own.
// Accessibility: the editor is a named group and every colour control has a name; the contrast summary is a live region.
// The headline's colour comes from the user's pick, so check its contrast: the editor's contrast audit is there for that.
// Note: ThemeEditor is a large component, so it is imported from its own path (march/components/theme-editor) and not from
// the march/ui barrel; its parts load as separate chunks, so it appears a moment after the page.
import { ThemeEditor, type ThemeDraft } from "march/components/theme-editor"

export function OneColorTheme() {
  // Reactive state: the draft. It is null until the editor creates it, so the headline falls back to the inherited colour.
  let $draft = null as ThemeDraft | null
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The headline reads the draft's primary colour (light mode) as its CSS colour. */}
    <span sx={{ text: ["2xl", "bold"] }} style={{ color: $draft?.light.primary ?? "inherit" }}>Bir renk seç, tema hazır</span>
    {/* base="scratch": start from one accent colour instead of a built-in theme. tabs={["colors"]}: only the Colors tab.
        presets={false}: no "start from" row. applyButton={false}: no "apply to the app" button. storageKey={false}: do not
        save anywhere. share={false}: ignore share links. warnUnsaved={false}: do not ask before leaving the page. */}
    <ThemeEditor bind:value={$draft} base="scratch" tabs={["colors"]} presets={false} applyButton={false} storageKey={false} share={false} warnUnsaved={false} />
  </div>
}
