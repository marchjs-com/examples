import { FontPicker, Card, type FontChoice, Field } from "march/ui"

// blog ayarları: başlık ve gövde yazı tipi ayrı seçilir; Google Fonts'tan yüklemeden önce ziyaretçiye izin sorulur
const Setting = (props: { title: string; children?: unknown }) => <Field label={props.title}>{props.children}</Field>

export function BlogTypography() {
  let $head = "Georgia"
  let $body = "System UI"
  let $headCss = "Georgia, serif"
  let $headWeight = 700
  let $bodyCss = "system-ui, sans-serif"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Setting title="Başlık">
        <FontPicker bind:value={$head} askConsent category="serif" weight={700} storageKey="blog.head"
          onPick={(c: FontChoice) => { $headCss = c.stack; $headWeight = c.weight }} />
      </Setting>
      <Setting title="Gövde">
        <FontPicker bind:value={$body} askConsent category="sans-serif" storageKey="blog.body" onPick={(c: FontChoice) => $bodyCss = c.stack} />
      </Setting>
    </div>
    <Card>
      <h2 style={{ fontFamily: $headCss, fontWeight: String($headWeight) }}>Sinyallerle tanışın</h2>
      <p style={{ fontFamily: $bodyCss }}>Bileşenler bir kez çalışır; değişen yalnız ona bağlı metin ya da öznitelik olur. Böylece sayfa hızlı kalır.</p>
    </Card>
  </div>
}
