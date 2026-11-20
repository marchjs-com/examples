import { Textarea, Card } from "march/ui"

// Textarea'nın bütün özellikleri bir arada: bağlı değer (bind:value) ve onChange, satır (rows), en az / en fazla
// karakter, içerikle büyüme (autosize) ve kapatılması, eş aralıklı yazı (mono), Tab ile girinti (tabIndent),
// tuşlar (onKeyDown: Ctrl + Enter gönderir), odak (onFocus, onBlur), ref, devre dışı, salt okunur, zorunlu,
// geçersiz (invalid + describedby), yazım denetimi, autocomplete, inputmode, autofocus, name, id, sınıf, aria-label
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function TextareaLab() {
  let $bio = ""
  let $changes = 0
  let $code = ""
  let $msg = ""
  let $sent = ""
  let $focus = "yok"
  let $refTag = ""
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Bağlı değer, onChange, en fazla 120 karakter, içerikle büyür">
      <Textarea bind:value={$bio} onChange={() => $changes++} rows={3} maxLength={120} aria-label="Biyografi"
        placeholder="Kendinden kısaca bahset" />
      <span>Uzunluk: {$bio.length}/120 · değişiklik: {$changes}</span>
    </Section>
    <Section title="Kod alanı: mono, Tab 4 boşluk girinti (çıkmak için Esc, sonra Tab), büyümez">
      <Textarea bind:value={$code} mono tabIndent={4} autosize={false} rows={5} spellcheck={false} aria-label="JSON"
        class="lab-code" placeholder="{ }" />
      <span>Kod: {$code.length} karakter</span>
    </Section>
    <Section title="Ctrl + Enter gönderir (onKeyDown), odak, ref">
      <Textarea bind:value={$msg} rows={2} aria-label="Mesaj" placeholder="Yaz, Ctrl + Enter ile gönder"
        onKeyDown={(e: KeyboardEvent) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $sent = $msg; $msg = "" } }}
        onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} ref={(el: HTMLTextAreaElement) => $refTag = el.tagName} />
      <span>Gönderilen: {$sent || "—"} · odak: {$focus} · ref: {$refTag}</span>
    </Section>
    <Card m:theme="night">
      <Section title="Durumlar: devre dışı, salt okunur, zorunlu ve geçersiz">
        <Textarea value="Bu alan kilitli." disabled aria-label="Kilitli not" />
        <Textarea value={"Sözleşme maddesi 4.2:\nİade 14 gün içinde yapılır."} readonly aria-label="Sözleşme" rows={2} />
        <Textarea value="kısa" required invalid minLength={10} describedby="lab-reason-hint" id="lab-reason" name="reason"
          autocomplete="off" inputmode="text" autofocus={false} aria-label="İade nedeni" />
        <span id="lab-reason-hint" sx={{ text: "sm", color: "danger" }}>En az 10 karakter yazın</span>
      </Section>
    </Card>
  </div>
}
