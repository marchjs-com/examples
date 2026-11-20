import { FileUpload, Card } from "march/ui"
import { trash } from "march/icons"

// FileUpload'ın bütün özellikleri bir arada: bind:value (tek dosya), value + onChange (yüklenenlerin adresleri),
// accept, maxSize, multiple, maxFiles, upload (ilerleme ve vazgeç), label, hint (metin / yok / kendiliğinden),
// preview, removeIcon, labels (her metin), onError, id, name, sınıf, aria-label, describedby, required, invalid,
// odak olayları, disabled, readonly (var olan dosyalar) ve koyu zemin
type UploadFn<R> = (file: File, ctx: { onProgress: (p: number | { loaded: number; total: number }) => void; signal: AbortSignal }) => Promise<R> | R
const upload: UploadFn<string> = (file, { onProgress, signal }) => new Promise((resolve, reject) => {
  let p = 0
  const id = setInterval(() => { p += 0.25; onProgress({ loaded: p * file.size, total: file.size }); if (p >= 1) { clearInterval(id); resolve(`https://cdn.hadisosyal.com/${file.name}`) } }, 40)
  signal.addEventListener("abort", () => { clearInterval(id); reject(new Error("vazgeçildi")) })
})
const NONE: unknown = null
const NO_URLS: unknown = []
const nameOf = (v: unknown) => (v instanceof File ? v.name : "—")

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function FileUploadLab() {
  let $cover = NONE
  let $urls = NO_URLS
  let $error = "yok"
  let $focus = "yok"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Tek görsel: bind:value, accept, maxSize, kendi ipucum, önizleme, ret metinleri, onError, aria-label">
      <FileUpload bind:value={$cover} accept="image/*" maxSize={50_000} label="Kapak görselini bırak" hint="PNG, JPG ya da SVG · en çok 50 KB"
        aria-label="Kapak görseli seç" class="lab-one" onError={(m: string) => { $error = m }}
        labels={{ typeNotAllowed: (n: string) => `${n}: yalnız görsel`, tooLarge: (n: string, max: string) => `${n} çok büyük (en çok ${max})`, remove: (n: string) => `${n} kaldır` }} />
      <span>Kapak: {nameOf($cover)} · Hata: {$error}</span>
    </Row>
    <Row title="Birden çok, en çok 2, yükleme ilerlemesi, önizlemesiz, çöp kutusu ikonu, kendi metinlerim">
      <FileUpload value={$urls} onChange={(v: unknown) => { $urls = v }} multiple maxFiles={2} maxSize={5_000_000} upload={upload}
        preview={false} removeIcon={trash} class="lab-many"
        labels={{ uploaded: "Yüklendi", cancel: "Vazgeç", uploading: (n: string) => `${n} yükleniyor`, cancelUpload: (n: string) => `${n} yüklemesini durdur`,
          remove: (n: string) => `${n} dosyasını kaldır`, tooMany: (m: number) => `En çok ${m} dosya`, max: (s: string) => `en çok ${s}` }} />
      <span>Yüklenen: {Array.isArray($urls) ? $urls.length : 0}</span>
    </Row>
    <Row title="Zorunlu, geçersiz, açıklama, id, name, odak">
      <FileUpload required invalid describedby="lab-doc-hint" id="lab-doc" name="document" hint={false} label="Kimlik belgesini bırak"
        onFocus={() => { $focus = "belge" }} onBlur={() => { $focus = "yok" }} />
      <small id="lab-doc-hint" sx={{ color: "danger" }}>Zorunlu: kimliğin ön yüzü</small>
      <span>Odak: {$focus}</span>
    </Row>
    <Row title="Durumlar">
      <FileUpload disabled label="Kapalı alan" class="lab-disabled" />
      <FileUpload readonly multiple value={["sozlesme.pdf", "fatura-kasim.pdf"]} label="Yalnız okunur" class="lab-readonly" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <FileUpload accept=".pdf" maxSize={10_000_000} label="Koyuda PDF bırak" />
      </Row>
    </Card>
  </div>
}
