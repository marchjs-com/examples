import { KeyValueEditor, Field, Button, Card, toast, CodeView } from "march/ui"
import { save } from "march/icons"

// yayın ayarları: uygulamanın ortam değişkenleri; altta .env dosyasının önizlemesi, kaydedince yeni sürüm çıkar
export function EnvSettings() {
  let $env: Record<string, string | number> = { API_URL: "https://api.hadisosyal.com", CACHE_TTL: "3600", LOG_LEVEL: "warn" }
  let $saving = false
  const $file = Object.entries($env).map(([k, v]) => `${k}=${v}`).join("\n")
  const deploy = () => {
    $saving = true
    setTimeout(() => { $saving = false; toast(`${Object.keys($env).length} değişkenle yeni sürüm yayında`) }, 1000)
  }
  return <Card title="Ortam değişkenleri" subtitle="Üretim · hadi-web"
    footer={<Button variant="primary" icon={save} loading={$saving} on:click={deploy}>Kaydet ve yayınla</Button>}>
    <Field label="Değişkenler" group help="Aynı ad iki kez yazılırsa yalnız ilki kaydedilir.">
      <KeyValueEditor bind:value={$env} keyPlaceholder="DEĞİŞKEN_ADI" valuePlaceholder="değer"
        labels={{ key: "Değişken adı", value: "Değeri", remove: "Değişkeni sil", add: "Değişken ekle", duplicate: "Bu ad zaten tanımlı" }} />
    </Field>
    <CodeView code={() => $file} lang="sh" label=".env" />
  </Card>
}
