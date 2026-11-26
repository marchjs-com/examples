// JobApplication: the real-life FileUpload example.
//
// What it shows: the documents step of a job application. A CV (one PDF, up to 5 MB) and portfolio images (up to 4, each
// with upload progress). Rejected files become toasts, and the application cannot be sent without a CV.
// When to use this pattern: forms where each upload slot has its own rules. Put each FileUpload in a Field for the label and
// the required mark, and let the button depend on the state.
// Keyboard: each drop zone is a role="button" (Enter / Space opens the file chooser); upload rows have Cancel and Remove
// buttons whose accessible names include the file name.
import { FileUpload, Field, Button, Card, toast } from "march/ui"
import { send } from "march/icons"

// The shape of an upload function: it gets the file and a context with onProgress (0..1 or { loaded, total }) and an
// AbortSignal (fired when the user presses Cancel), and returns (a promise of) the result that becomes the value.
type UploadFn<R> = (file: File, ctx: { onProgress: (p: number | { loaded: number; total: number }) => void; signal: AbortSignal }) => Promise<R> | R
// A fake upload: progress goes up by 20% every 300 ms, then it resolves with the "stored" address. A real one would send
// the file with fetch() and pass `signal` along so Cancel really stops it. On abort we stop the timer and reject.
const upload: UploadFn<string> = (file, { onProgress, signal }) => new Promise((resolve, reject) => {
  let p = 0
  const id = setInterval(() => { p += 0.2; onProgress(Math.min(p, 1)); if (p >= 1) { clearInterval(id); resolve(`https://cdn.hadisosyal.com/is/${file.name}`) } }, 300)
  signal.addEventListener("abort", () => { clearInterval(id); reject(new Error("vazgeçildi")) })
})
// Empty initial values, typed unknown because FileUpload's value can be a File, a list of Files or upload results.
const NONE: unknown = null
const NO_URLS: unknown = []

export function JobApplication() {
  let $cv = NONE
  let $works = NO_URLS
  // Derived: how many portfolio files there are (the value becomes the list of what upload resolved with).
  const $count = Array.isArray($works) ? $works.length : 0
  const apply = () => toast(`Başvurun alındı: özgeçmiş + ${$count} görsel`)
  return <Card title="Başvuru · Belgeler" subtitle="Ön yüz geliştirici · İstanbul">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field adds a label and the required mark. FileUpload here: bind:value keeps $cv in sync; accept=".pdf" and maxSize
          are checked before the file is kept; onError receives the rejection message, which we show as a toast. */}
      <Field label="Özgeçmiş" required>
        <FileUpload bind:value={$cv} accept=".pdf" maxSize={5_000_000} label="PDF özgeçmişini bırak" onError={(m: string) => toast(m)} />
      </Field>
      {/* multiple + maxFiles={4}: up to four files. upload makes each file show a progress bar with a Cancel button.
          labels replaces built-in texts; any subset works (here the "uploaded" badge, Cancel and the too-many message). */}
      <Field label="Portfolyo (isteğe bağlı)">
        <FileUpload bind:value={$works} multiple maxFiles={4} accept="image/*" upload={upload} onError={(m: string) => toast(m)}
          labels={{ uploaded: "Yüklendi", cancel: "Vazgeç", tooMany: (n: number) => `En çok ${n} görsel` }} />
      </Field>
      {/* The button stays disabled until a CV exists: the form's rule is expressed by a single reactive expression. */}
      <Button icon={send} disabled={!$cv} on:click={apply}>Başvuruyu gönder</Button>
    </div>
  </Card>
}
