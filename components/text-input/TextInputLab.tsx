import { TextInput, Card } from "march/ui"
import { Icon, ticket } from "march/icons"

// TextInput'un bütün özellikleri bir arada: bağlı değer (bind:value) ve onChange, dönüştürme (transform), ön ek / son ek,
// tür (type), en az / en fazla karakter, otomatik doldurma ve klavye ipucu (autocomplete, inputmode), kendi hata metni
// (error, errorSpace), Enter (onKeyDown) ve yapıştırma (onPaste), ref, odak (onFocus, onBlur), devre dışı, salt okunur,
// zorunlu, geçersiz (invalid + describedby), yazım denetimi, autofocus, name, id, sınıf, aria-label / ariaLabel
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function TextInputLab() {
  let $code = ""
  let $changes = 0
  let $mail = ""
  let $note = ""
  let $sent = ""
  let $pasted = ""
  let $focus = "yok"
  let $refTag = ""
  const $mailError = $mail.includes("@") ? "" : "Geçerli bir e-posta yazın"
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Dönüştürme (transform), ön ek, en fazla 10, onChange">
      <TextInput bind:value={$code} onChange={() => $changes++} transform={(v: string) => v.toUpperCase()} maxLength={10}
        prefix={<Icon of={ticket} />} aria-label="Kupon kodu" placeholder="HADI10" spellcheck={false} />
      <span>Kod: {$code} · değişiklik: {$changes}</span>
    </Section>
    <Section title="Ön ek ve son ek">
      <TextInput value="magaza" prefix="https://" suffix=".hadisosyal.com" ariaLabel="Alt alan adı" class="lab-subdomain" />
    </Section>
    <Section title="Field olmadan kendi hata metni (error, errorSpace), e-posta türü">
      <TextInput bind:value={$mail} type="email" autocomplete="email" inputmode="email" required name="email"
        aria-label="E-posta adresi" error={$mailError} errorSpace />
    </Section>
    <Section title="Enter (onKeyDown), yapıştırma (onPaste), odak, ref">
      <TextInput bind:value={$note} aria-label="Not" placeholder="Yaz ve Enter'a bas" minLength={2}
        onKeyDown={(e: KeyboardEvent) => { if (e.key === "Enter") { $sent = $note; $note = "" } }}
        onPaste={(e: ClipboardEvent) => { e.preventDefault(); $pasted = e.clipboardData?.getData("text") ?? "" }}
        onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} ref={(el: HTMLInputElement) => $refTag = el.tagName} />
      <span>Gönderilen: {$sent || "—"} · yapıştırılan: {$pasted || "—"} · odak: {$focus} · ref: {$refTag}</span>
    </Section>
    <Card m:theme="night">
      <Section title="Durumlar: devre dışı, salt okunur, geçersiz">
        <TextInput value="Kapalı alan" disabled aria-label="Devre dışı alan" />
        <TextInput value="TR12 0006 4000 0011 2345 6789 01" readonly aria-label="IBAN" autofocus={false} />
        <TextInput value="ab" invalid describedby="lab-invalid-hint" id="lab-invalid" aria-label="Takma ad" />
        <span id="lab-invalid-hint" sx={{ text: "sm", color: "danger" }}>Bu takma ad alınmış</span>
      </Section>
    </Card>
  </div>
}
