// TextareaLab: the full-featured Textarea example.
//
// What it shows: the Textarea options together: a bound value (bind:value) and onChange, rows, minLength / maxLength, growing
// with the content (autosize) and turning it off, monospace text (mono), indenting with the Tab key (tabIndent), key handling
// (onKeyDown: Ctrl + Enter sends), focus (onFocus, onBlur), ref, disabled, readonly, required, invalid with describedby,
// spellcheck, autocomplete, inputmode, autofocus, name, id, class and aria-label. Each section shows one idea and prints what
// happened. Use it as a catalogue: copy the prop you need.
//
// Animation: none of its own; with autosize (the default) the field grows as you type, `autosize={false}` keeps the height.
// Accessibility: a native <textarea>. Without a <Field> its name must come from `aria-label`; `invalid` + `describedby` link
// your own message by hand. With `tabIndent` the Tab key no longer leaves the field: Shift+Tab still moves back, and Escape
// followed by Tab moves on, so say so near a code field.
import { Textarea, Card } from "march/ui"

// A small layout helper: a caption above one example, so each option has a name on the page.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function TextareaLab() {
  // Reactive state: the bio and how many times it changed, the code text, the message and what was sent, the focus state,
  // and the tag of the element received through `ref`.
  let $bio = ""
  let $changes = 0
  let $code = ""
  let $msg = ""
  let $sent = ""
  let $focus = "yok"
  let $refTag = ""
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Bağlı değer, onChange, en fazla 120 karakter, içerikle büyür">
      {/* bind:value keeps $bio in sync. rows={3} is the starting height; the field grows with the content because autosize is
          on by default. maxLength={120} stops typing at 120 characters. onChange runs on a change. */}
      <Textarea bind:value={$bio} onChange={() => $changes++} rows={3} maxLength={120} aria-label="Biyografi"
        placeholder="Kendinden kısaca bahset" />
      <span>Uzunluk: {$bio.length}/120 · değişiklik: {$changes}</span>
    </Section>
    <Section title="Kod alanı: mono, Tab 4 boşluk girinti (çıkmak için Esc, sonra Tab), büyümez">
      {/* mono: monospace text, for code, JSON or logs. tabIndent={4}: Tab inserts four spaces instead of leaving the field.
          autosize={false}: a fixed height (rows={5}) instead of growing. spellcheck={false}: no spell check on code. */}
      <Textarea bind:value={$code} mono tabIndent={4} autosize={false} rows={5} spellcheck={false} aria-label="JSON"
        class="lab-code" placeholder="{ }" />
      <span>Kod: {$code.length} karakter</span>
    </Section>
    <Section title="Ctrl + Enter gönderir (onKeyDown), odak, ref">
      {/* onKeyDown: sends the message on Ctrl (or Cmd) + Enter and calls preventDefault() so no new line is added. onFocus /
          onBlur track the focus. ref gives us the textarea element. */}
      <Textarea bind:value={$msg} rows={2} aria-label="Mesaj" placeholder="Yaz, Ctrl + Enter ile gönder"
        onKeyDown={(e: KeyboardEvent) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $sent = $msg; $msg = "" } }}
        onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} ref={(el: HTMLTextAreaElement) => $refTag = el.tagName} />
      <span>Gönderilen: {$sent || "—"} · odak: {$focus} · ref: {$refTag}</span>
    </Section>
    {/* m:theme="night" draws the card in the dark theme, to check the states on a dark ground. */}
    <Card m:theme="night">
      <Section title="Durumlar: devre dışı, salt okunur, zorunlu ve geçersiz">
        {/* disabled: not editable and out of the tab order. readonly: focusable but not editable. required, invalid and
            minLength: the form states; describedby points the field at our own message (by id). name, autocomplete, inputmode
            and autofocus are passed to the native element. */}
        <Textarea value="Bu alan kilitli." disabled aria-label="Kilitli not" />
        <Textarea value={"Sözleşme maddesi 4.2:\nİade 14 gün içinde yapılır."} readonly aria-label="Sözleşme" rows={2} />
        <Textarea value="kısa" required invalid minLength={10} describedby="lab-reason-hint" id="lab-reason" name="reason"
          autocomplete="off" inputmode="text" autofocus={false} aria-label="İade nedeni" />
        <span id="lab-reason-hint" sx={{ text: "sm", color: "danger" }}>En az 10 karakter yazın</span>
      </Section>
    </Card>
  </div>
}
