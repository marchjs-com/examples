import { Card, toast } from "march/ui"
import { ThemeEditor, type ThemeDraft } from "march/components/theme-editor"

// ayarlar sayfasında "Marka teması": gece temasından başla; renk, yazı ve biçim; Kaydet sunucuya gönderir (burada bir bildirim)
export function BrandThemeSettings() {
  let $draft = null as ThemeDraft | null
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: ["lg", "bold"] }}>Marka teması</span>
      <span sx={{ text: "sm", color: "muted" }}>Taslak: {$draft?.name ?? "yükleniyor…"}</span>
      <ThemeEditor bind:value={$draft} base="night" tabs={["colors", "type", "shape"]} storageKey="brand-theme" share={false}
        onSave={(d) => toast(`"${d.name}" kaydedildi`, { kind: "success" })} />
    </div>
  </Card>
}
