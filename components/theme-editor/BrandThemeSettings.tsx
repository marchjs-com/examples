// BrandThemeSettings: the real-life ThemeEditor example.
//
// What it shows: a "Brand theme" section of a settings page. The editor starts from the built-in night theme, offers only the
// Colors, Type and Shape tabs, remembers the draft under its own storage key, ignores share links in the URL, and the Save
// button calls `onSave` (here a toast; a real app would send the draft to a server).
// When to use this pattern: letting someone customise a theme inside your own page. The draft is plain data, so you can keep
// it in your state with bind:value, show it elsewhere (the line above the editor) and persist it however you like.
//
// Animation: the editor's preview and motion tokens belong to the theme being edited; with its preview controls the user
// can try reduced motion (the preview then uses zero durations). Nothing else here moves.
// Accessibility: the editor is a named group; every control has a name; tabs move with the arrow keys; Ctrl/Cmd+Z and
// Ctrl/Cmd+Shift+Z undo and redo outside text fields; the contrast summary is a live region.
// Note: ThemeEditor is a large component, so it is imported from its own path (march/components/theme-editor) and not from
// the march/ui barrel; its parts load as separate chunks, so it appears a moment after the page.
import { Card, toast } from "march/ui"
import { ThemeEditor, type ThemeDraft } from "march/components/theme-editor"

export function BrandThemeSettings() {
  // Reactive state: the draft being edited. It is null until the editor creates it, which is why the line below says
  // "loading".
  let $draft = null as ThemeDraft | null
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: ["lg", "bold"] }}>Marka teması</span>
      <span sx={{ text: "sm", color: "muted" }}>Taslak: {$draft?.name ?? "yükleniyor…"}</span>
      {/* bind:value keeps the draft in $draft. base="night": a new draft starts as a copy of the night theme. tabs: only
          these sections are shown. storageKey: where Save writes the draft (use false for no storage). share={false}: do not
          read a ?theme=… share link from the URL on start. onSave receives the saved draft. */}
      <ThemeEditor bind:value={$draft} base="night" tabs={["colors", "type", "shape"]} storageKey="brand-theme" share={false}
        onSave={(d) => toast(`"${d.name}" kaydedildi`, { kind: "success" })} />
    </div>
  </Card>
}
