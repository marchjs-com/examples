// EnvSettings: the real-life KeyValueEditor example.
//
// What it shows: the environment variables of a deployed app. The visitor edits name → value rows, a CodeView below
// previews the resulting .env file live, and the Save button (with a loading state) "publishes" a new release.
// When to use this pattern: settings that are really a free-form dictionary (environment variables, HTTP headers,
// labels, feature flags). The editor gives you the object; everything else (preview, validation, saving) is plain code.
//
// Animation: the only motion is the Button's own loading indicator, which follows the motion engine (reduced motion,
// global speed). Accessibility: Field with `group` names the editor as a group and ties the help text to it; each key
// and value input has its own accessible name from `labels`.
import { KeyValueEditor, Field, Button, Card, toast, CodeView } from "march/ui"
import { save } from "march/icons"

export function EnvSettings() {
  // The variables as one object; the editor reads and writes it through bind:value.
  let $env: Record<string, string | number> = { API_URL: "https://api.hadisosyal.com", CACHE_TTL: "3600", LOG_LEVEL: "warn" }
  // $saving drives the Button's loading state while the (simulated) request runs.
  let $saving = false
  // A derived signal: the text of the .env file, rebuilt every time a row changes.
  const $file = Object.entries($env).map(([k, v]) => `${k}=${v}`).join("\n")
  // Stands in for a real request: it waits a second, then clears the loading state and shows a toast. Replace the
  // timeout with your API call.
  const deploy = () => {
    $saving = true
    setTimeout(() => { $saving = false; toast(`${Object.keys($env).length} değişkenle yeni sürüm yayında`) }, 1000)
  }
  // The primary action lives in the Card footer so it is always in the same place.
  return <Card title="Ortam değişkenleri" subtitle="Üretim · hadi-web"
    footer={<Button variant="primary" icon={save} loading={$saving} on:click={deploy}>Kaydet ve yayınla</Button>}>
    {/* Field `group` is for controls that are not a single input: it labels the whole editor and `help` explains the
        duplicate-key rule (the editor flags the repeated row and keeps only the first value in the object). */}
    <Field label="Değişkenler" group help="Aynı ad iki kez yazılırsa yalnız ilki kaydedilir.">
      {/* No `numbers` here: environment values are always text, even when they look like numbers (CACHE_TTL). */}
      <KeyValueEditor bind:value={$env} keyPlaceholder="DEĞİŞKEN_ADI" valuePlaceholder="değer"
        labels={{ key: "Değişken adı", value: "Değeri", remove: "Değişkeni sil", add: "Değişken ekle", duplicate: "Bu ad zaten tanımlı" }} />
    </Field>
    {/* `code` is a function so the preview follows $file as it changes; lang="sh" colours it like a shell file. */}
    <CodeView code={() => $file} lang="sh" label=".env" />
  </Card>
}
