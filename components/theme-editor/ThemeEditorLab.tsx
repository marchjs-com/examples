import { Toolbar, Button } from "march/ui"
import { ThemeEditor, presetCopy, type ThemeDraft } from "march/components/theme-editor"

// ThemeEditor'ün bütün özellikleri: value + setValue + onChange, başlangıç (base), sekmeler, önizleme ve anahtarları,
// kayıt anahtarı, paylaşım bağlantısı, ayrılırken uyarı, onSave, salt okunur, hazır temalar satırı, ad alanı,
// geri al / yinele, "uygulamaya uygula", kendi metinler ve sınıf. Üstteki anahtarlar bazılarını canlı açıp kapatır.
export function ThemeEditorLab() {
  let $draft: ThemeDraft | null = presetCopy("neon")
  let $changes = 0
  let $saved = "yok"
  let $readonly = false
  let $preview = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <Toolbar label="Lab ayarları">
      <Button size="sm" variant="secondary" pressed={$readonly} on:click={() => $readonly = !$readonly}>Salt okunur</Button>
      <Button size="sm" variant="secondary" pressed={$preview} on:click={() => $preview = !$preview}>Önizleme</Button>
      <span sx={{ text: "sm" }}>Değişiklik: {$changes} · Kaydedilen: {$saved}</span>
    </Toolbar>
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
