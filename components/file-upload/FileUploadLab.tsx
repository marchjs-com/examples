// FileUploadLab: the full-featured FileUpload example; it uses every prop at least once.
//
// Props shown here: bind:value (one file), value + onChange (upload results), accept, maxSize, multiple, maxFiles, upload
// (progress and cancel), label, hint (text / off / automatic), preview, removeIcon, labels (every text), onError, id, name,
// class, aria-label, describedby, required, invalid, focus events, disabled, readonly (existing files) and a dark surface.
// Use it as a reference when you need one option: find the prop below and copy the line.
// FileUploadLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { FileUpload, Card } from "march/ui"
import { trash } from "march/icons"

// The shape of an upload function: (file, { onProgress, signal }) returns (a promise of) the result that becomes the value.
type UploadFn<R> = (file: File, ctx: { onProgress: (p: number | { loaded: number; total: number }) => void; signal: AbortSignal }) => Promise<R> | R
// A fake upload: every 40 ms progress grows by 25% and is reported as { loaded, total } (a number 0..1 works too); at 100% it
// resolves with an address. `signal` is aborted when the user presses Cancel, so we stop the timer and reject.
const upload: UploadFn<string> = (file, { onProgress, signal }) => new Promise((resolve, reject) => {
  let p = 0
  const id = setInterval(() => { p += 0.25; onProgress({ loaded: p * file.size, total: file.size }); if (p >= 1) { clearInterval(id); resolve(`https://cdn.hadisosyal.com/${file.name}`) } }, 40)
  signal.addEventListener("abort", () => { clearInterval(id); reject(new Error("vazgeçildi")) })
})
// Empty initial values (typed unknown: a value can be a File, a list of Files or upload results) and a helper for the file name.
const NONE: unknown = null
const NO_URLS: unknown = []
const nameOf = (v: unknown) => (v instanceof File ? v.name : "—")

// A small layout helper: a muted caption above a column of controls. It only organises the lab.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function FileUploadLab() {
  // State of the lab: the single file, the uploaded addresses, the last error and whether a zone has focus.
  let $cover = NONE
  let $urls = NO_URLS
  let $error = "yok"
  let $focus = "yok"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. One image. bind:value keeps $cover in sync. accept="image/*" and maxSize={50_000} are checked before a file is kept.
        hint is your own hint line (false would remove it; leaving it out shows accept and max size). aria-label names the
        zone for screen readers, class is a hook for tests, onError gets the rejection message. labels replaces the rejection
        texts and the remove button's name; each can be a string or a function of the file name. */}
    <Row title="Tek görsel: bind:value, accept, maxSize, kendi ipucum, önizleme, ret metinleri, onError, aria-label">
      <FileUpload bind:value={$cover} accept="image/*" maxSize={50_000} label="Kapak görselini bırak" hint="PNG, JPG ya da SVG · en çok 50 KB"
        aria-label="Kapak görseli seç" class="lab-one" onError={(m: string) => { $error = m }}
        labels={{ typeNotAllowed: (n: string) => `${n}: yalnız görsel`, tooLarge: (n: string, max: string) => `${n} çok büyük (en çok ${max})`, remove: (n: string) => `${n} kaldır` }} />
      <span>Kapak: {nameOf($cover)} · Hata: {$error}</span>
    </Row>
    {/* 2. Several files. value + onChange is the one-way form of bind:value: with `upload` the value becomes the list of
        what upload resolved with (addresses here). multiple + maxFiles={2} limit the count (the rest are rejected with
        labels.tooMany). upload gives each file a progress bar and a Cancel button. preview={false} turns the thumbnails
        off, and removeIcon replaces the "×" of the remove button with an icon. labels gives every text of the upload rows. */}
    <Row title="Birden çok, en çok 2, yükleme ilerlemesi, önizlemesiz, çöp kutusu ikonu, kendi metinlerim">
      <FileUpload value={$urls} onChange={(v: unknown) => { $urls = v }} multiple maxFiles={2} maxSize={5_000_000} upload={upload}
        preview={false} removeIcon={trash} class="lab-many"
        labels={{ uploaded: "Yüklendi", cancel: "Vazgeç", uploading: (n: string) => `${n} yükleniyor`, cancelUpload: (n: string) => `${n} yüklemesini durdur`,
          remove: (n: string) => `${n} dosyasını kaldır`, tooMany: (m: number) => `En çok ${m} dosya`, max: (s: string) => `en çok ${s}` }} />
      <span>Yüklenen: {Array.isArray($urls) ? $urls.length : 0}</span>
    </Row>
    {/* 3. Form attributes. required and invalid set the ARIA state (aria-required / aria-invalid); describedby links the zone
        to the explanation below it; id and name are for labels and form submission; hint={false} removes the hint line;
        onFocus / onBlur report focus, which we show as text. */}
    <Row title="Zorunlu, geçersiz, açıklama, id, name, odak">
      <FileUpload required invalid describedby="lab-doc-hint" id="lab-doc" name="document" hint={false} label="Kimlik belgesini bırak"
        onFocus={() => { $focus = "belge" }} onBlur={() => { $focus = "yok" }} />
      <small id="lab-doc-hint" sx={{ color: "danger" }}>Zorunlu: kimliğin ön yüzü</small>
      <span>Odak: {$focus}</span>
    </Row>
    {/* 4. States. disabled blocks dropping and taking focus; readonly shows existing files (given as names) without a remove
        button, handy for a review screen. */}
    <Row title="Durumlar">
      <FileUpload disabled label="Kapalı alan" class="lab-disabled" />
      <FileUpload readonly multiple value={["sozlesme.pdf", "fatura-kasim.pdf"]} label="Yalnız okunur" class="lab-readonly" />
    </Row>
    {/* 5. Dark surface: m:theme="night" draws the Card and everything in it in the dark theme; accept=".pdf" also takes extensions. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <FileUpload accept=".pdf" maxSize={10_000_000} label="Koyuda PDF bırak" />
      </Row>
    </Card>
  </div>
}
