// TextInputLab: the full-featured TextInput example.
//
// What it shows: the TextInput options together: a bound value (bind:value) and onChange, transform, prefix / suffix, type,
// minLength / maxLength, autocomplete and inputmode hints, its own error text (error, errorSpace), Enter (onKeyDown) and
// paste (onPaste) handlers, ref, focus (onFocus, onBlur), disabled, readonly, required, invalid with describedby,
// spellcheck, autofocus, name, id, class and aria-label / ariaLabel. Each section shows one idea and prints what happened.
// Use it as a catalogue: copy the prop you need.
//
// Animation: none of its own.
// Accessibility: a native <input>. Without a <Field> its name must come from `aria-label` (or ariaLabel); an `error` text is
// linked with aria-describedby and aria-invalid and is a role="alert"; `invalid` + `describedby` do the same by hand for
// your own message. Prefix and suffix are plain text next to the input, so they are read with it.
import { TextInput, Card } from "march/ui"
import { Icon, ticket } from "march/icons"

// A small layout helper: a caption above one example, so each option has a name on the page.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function TextInputLab() {
  // Reactive state: the coupon code and how many times it changed, the e-mail, the note and what was done with it (sent,
  // pasted), the focus state, and the tag of the input element received through `ref`.
  let $code = ""
  let $changes = 0
  let $mail = ""
  let $note = ""
  let $sent = ""
  let $pasted = ""
  let $focus = "yok"
  let $refTag = ""
  // A derived value (a `const $x` is recomputed when $mail changes): the e-mail's error text, empty once it has an "@".
  const $mailError = $mail.includes("@") ? "" : "Geçerli bir e-posta yazın"
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Dönüştürme (transform), ön ek, en fazla 10, onChange">
      {/* transform rewrites the typed text (here to upper case). onChange runs on a change. maxLength={10} limits the length.
          prefix takes text or a node (an icon). spellcheck={false} turns the browser's spell check off. */}
      <TextInput bind:value={$code} onChange={() => $changes++} transform={(v: string) => v.toUpperCase()} maxLength={10}
        prefix={<Icon of={ticket} />} aria-label="Kupon kodu" placeholder="HADI10" spellcheck={false} />
      <span>Kod: {$code} · değişiklik: {$changes}</span>
    </Section>
    <Section title="Ön ek ve son ek">
      {/* value without bind: an uncontrolled start value. prefix and suffix are text around the input; ariaLabel names it. */}
      <TextInput value="magaza" prefix="https://" suffix=".hadisosyal.com" ariaLabel="Alt alan adı" class="lab-subdomain" />
    </Section>
    <Section title="Field olmadan kendi hata metni (error, errorSpace), e-posta türü">
      {/* type="email" brings up the e-mail keyboard on phones; autocomplete and inputmode are hints to the browser; required
          and name are the usual form attributes. error is the text under the input (an empty string means none), and
          errorSpace keeps the line's height so the layout does not jump. */}
      <TextInput bind:value={$mail} type="email" autocomplete="email" inputmode="email" required name="email"
        aria-label="E-posta adresi" error={$mailError} errorSpace />
    </Section>
    <Section title="Enter (onKeyDown), yapıştırma (onPaste), odak, ref">
      {/* onKeyDown: sends the note on Enter. onPaste: preventDefault() keeps the pasted text out of the input, and we read it
          from the clipboard instead. onFocus / onBlur track the focus. ref gives us the input element. minLength={2} sets the
          shortest allowed text. */}
      <TextInput bind:value={$note} aria-label="Not" placeholder="Yaz ve Enter'a bas" minLength={2}
        onKeyDown={(e: KeyboardEvent) => { if (e.key === "Enter") { $sent = $note; $note = "" } }}
        onPaste={(e: ClipboardEvent) => { e.preventDefault(); $pasted = e.clipboardData?.getData("text") ?? "" }}
        onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} ref={(el: HTMLInputElement) => $refTag = el.tagName} />
      <span>Gönderilen: {$sent || "—"} · yapıştırılan: {$pasted || "—"} · odak: {$focus} · ref: {$refTag}</span>
    </Section>
    {/* m:theme="night" draws the card in the dark theme, to check the states on a dark ground. */}
    <Card m:theme="night">
      <Section title="Durumlar: devre dışı, salt okunur, geçersiz">
        {/* disabled: not editable and out of the tab order. readonly: focusable and selectable but not editable. invalid marks
            the input invalid, and describedby points it at our own message (by id). */}
        <TextInput value="Kapalı alan" disabled aria-label="Devre dışı alan" />
        <TextInput value="TR12 0006 4000 0011 2345 6789 01" readonly aria-label="IBAN" autofocus={false} />
        <TextInput value="ab" invalid describedby="lab-invalid-hint" id="lab-invalid" aria-label="Takma ad" />
        <span id="lab-invalid-hint" sx={{ text: "sm", color: "danger" }}>Bu takma ad alınmış</span>
      </Section>
    </Card>
  </div>
}
