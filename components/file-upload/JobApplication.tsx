import { FileUpload, Field, Button, Card, toast } from "march/ui"
import { send } from "march/icons"

// iş başvurusunun belgeler adımı: özgeçmiş (tek PDF, en çok 5 MB) ve portfolyo görselleri (en çok 4, yükleme
// ilerlemesiyle); reddedilen dosya bildirim olur, özgeçmiş olmadan gönderilemez
type UploadFn<R> = (file: File, ctx: { onProgress: (p: number | { loaded: number; total: number }) => void; signal: AbortSignal }) => Promise<R> | R
const upload: UploadFn<string> = (file, { onProgress, signal }) => new Promise((resolve, reject) => {
  let p = 0
  const id = setInterval(() => { p += 0.2; onProgress(Math.min(p, 1)); if (p >= 1) { clearInterval(id); resolve(`https://cdn.hadisosyal.com/is/${file.name}`) } }, 300)
  signal.addEventListener("abort", () => { clearInterval(id); reject(new Error("vazgeçildi")) })
})
const NONE: unknown = null
const NO_URLS: unknown = []

export function JobApplication() {
  let $cv = NONE
  let $works = NO_URLS
  const $count = Array.isArray($works) ? $works.length : 0
  const apply = () => toast(`Başvurun alındı: özgeçmiş + ${$count} görsel`)
  return <Card title="Başvuru · Belgeler" subtitle="Ön yüz geliştirici · İstanbul">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Özgeçmiş" required>
        <FileUpload bind:value={$cv} accept=".pdf" maxSize={5_000_000} label="PDF özgeçmişini bırak" onError={(m: string) => toast(m)} />
      </Field>
      <Field label="Portfolyo (isteğe bağlı)">
        <FileUpload bind:value={$works} multiple maxFiles={4} accept="image/*" upload={upload} onError={(m: string) => toast(m)}
          labels={{ uploaded: "Yüklendi", cancel: "Vazgeç", tooMany: (n: number) => `En çok ${n} görsel` }} />
      </Field>
      <Button icon={send} disabled={!$cv} on:click={apply}>Başvuruyu gönder</Button>
    </div>
  </Card>
}
