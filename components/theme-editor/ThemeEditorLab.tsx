// ThemeEditorLab: the full-featured ThemeEditor example.
//
// What it shows: the ThemeEditor options together: value + setValue + onChange, the starting theme (base), the tabs, the
// preview and its switches, the storage key, the share link, the unsaved-changes warning, onSave, readonly, the "start from"
// row, the name field, undo / redo, the "apply to the app" button, your own texts (labels) and class. A toolbar above turns
// two of them (readonly and the preview) on and off live.
// Use it as a catalogue: copy the prop you need. Props are described in the ThemeEditor docs.
//
// Animation: the editor's preview and motion tokens belong to the theme being edited; nothing in the editor itself needs
// switching off here (the preview is off unless the toolbar turns it on).
// Accessibility: the editor is a named group (`labels.editor`); every control has a name; tabs move with the arrow keys;
// Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z undo and redo outside text fields; the contrast summary is a live region.
// Note: ThemeEditor is a large component, so it is imported from its own path (march/components/theme-editor) and not from
// the march/ui barrel; its parts load as separate chunks. presetCopy("neon") makes a draft from a built-in theme.
import { Toolbar, Button } from "march/ui"
import { ThemeEditor, presetCopy, type ThemeDraft } from "march/components/theme-editor"

export function ThemeEditorLab() {
  // Reactive state: the draft (it starts as a copy of the neon preset), how many changes were made, the name of the last saved
  // draft, and the two live switches.
  let $draft: ThemeDraft | null = presetCopy("neon")
  let $changes = 0
  let $saved = "yok"
  let $readonly = false
  let $preview = false
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The toolbar: two toggle buttons (pressed shows their state) and a line with what the editor reported. */}
    <Toolbar label="Lab ayarları">
      <Button size="sm" variant="secondary" pressed={$readonly} on:click={() => $readonly = !$readonly}>Salt okunur</Button>
      <Button size="sm" variant="secondary" pressed={$preview} on:click={() => $preview = !$preview}>Önizleme</Button>
      <span sx={{ text: "sm" }}>Değişiklik: {$changes} · Kaydedilen: {$saved}</span>
    </Toolbar>
    {/* The function child is drawn again when $readonly or $preview changes, because these options are read as plain values.
        value + setValue: the draft is controlled from here (bind:value does the same in one prop). onChange runs on every
        change. base: where a new draft starts. tabs: only these sections are shown. preview: the live preview beside the
        controls, and previewControls={false} hides its switches (light / dark, direction, reduced motion). storageKey: where
        Save writes the draft. share={false}: ignore ?theme=… links. warnUnsaved={false}: no question when leaving the page.
        onSave receives the saved draft. readonly: look, do not change. presets={false}: no "start from" row. nameField,
        historyButtons: the name field and the undo / redo buttons (on by default, written out here). applyButton={false}:
        no "apply to the app" button. labels: our own texts for the frame (the group name, the name field, the save and state
        texts and the tab names). class is kept on the root (the tests find it). */}
    {() => <ThemeEditor
      value={$draft}
      setValue={(d) => $draft = d}
      onChange={() => $changes++}
      base="neon"
      tabs={["colors", "shape", "motion", "export"]}
      preview={$preview}
      previewControls={false}
      storageKey="lab-theme"
      share={false}
      warnUnsaved={false}
      onSave={(d) => $saved = d.name}
      readonly={$readonly}
      presets={false}
      nameField
      historyButtons
      applyButton={false}
      labels={{ editor: "Lab teması", name: "Tema adı", save: "Kaydet", unsaved: "Kaydedilmedi", saved: "Kaydedildi", tabs: { colors: "Palet", shape: "Biçim", motion: "Devinim", export: "Çıktı" } }}
      class="lab-te"
    />}
  </div>
}
