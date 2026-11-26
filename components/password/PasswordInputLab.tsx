// PasswordInputLab: the full-featured PasswordInput example; it uses every prop at least once.
//
// PasswordInput is a password field with a show / hide button. Props shown here: bind:value and onChange, toggle (four
// forms: the eye icon, text, your own drawing, none), labels (show, hide, showPassword, hidePassword), onToggle,
// placeholder, autocomplete, minLength / maxLength, required, invalid, disabled, readonly, id / name / class, aria-label
// (and its camelCase twin ariaLabel), describedby and the focus events, plus a dark background.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PasswordInputLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { PasswordInput, Card } from "march/ui"

// One example of the Lab: a small muted title and the fields under it. Plain composition, no PasswordInput feature.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function PasswordInputLab() {
  // Reactive state: a shared password, a change counter, whether the Wi-Fi password is shown, the new password, focus.
  let $pw = "march-2026"
  let $changes = 0
  let $shown = false
  let $fresh = ""
  let $focused = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Göz ikonu (varsayılan), bind:value, onChange">
      {/* The default: an eye button at the end. bind:value keeps $pw in step; onChange runs after every edit. A field
          without a visible label needs aria-label as its accessible name. */}
      <PasswordInput bind:value={$pw} aria-label="Parola" onChange={() => $changes++} />
      <span sx={{ text: "sm" }}>Uzunluk: {$pw.length} · değişiklik: {$changes}</span>
    </Row>
    <Row title="Metin düğmesi, kendi metinlerin, onToggle">
      {/* toggle="text": the button shows words instead of the eye. labels.show / hide: the words on the button;
          labels.showPassword / hidePassword: the button's accessible name, which says what it does. onToggle gets true
          when the password becomes visible and false when it is hidden again. The button is a real button with
          aria-pressed. */}
      <PasswordInput value="kahve-molasi-42" toggle="text" aria-label="Wi-Fi şifresi" onToggle={(s: boolean) => $shown = s}
        labels={{ show: "Göster", hide: "Gizle", showPassword: "Wi-Fi şifresini göster", hidePassword: "Wi-Fi şifresini gizle" }} />
      <span sx={{ text: "sm" }}>Wi-Fi şifresi {$shown ? "görünüyor" : "gizli"}</span>
    </Row>
    <Row title="Kendi çizimin ve düğmesiz">
      {/* toggle as a function: it gets whether the password is shown and returns the button's content (here emojis).
          ariaLabel is the camelCase spelling of aria-label. toggle={false} removes the button, so the password can
          never be revealed. */}
      <PasswordInput bind:value={$pw} ariaLabel="Parola (maymun)" toggle={(shown: boolean) => (shown ? "🙈" : "🐵")} />
      <PasswordInput value="gizli-kalir" toggle={false} aria-label="Düğmesiz parola" />
    </Row>
    <Row title="Form: zorunlu, geçersiz, uzunluk, otomatik doldurma, odak">
      {/* Form use.
          - id / name / class: for labels, form submission and CSS or tests. required: the field must be filled.
          - invalid: marks the field with aria-invalid; here true while the text is non-empty but shorter than 8.
          - placeholder, minLength / maxLength: the usual input attributes.
          - autocomplete="new-password": tells password managers this is a sign-up or change field, so they offer a
            generated password instead of filling an old one (the default is "current-password").
          - describedby points at the hint text below, so a screen reader reads it with the field.
          - onFocus / onBlur: focus entering and leaving the field. */}
      <PasswordInput bind:value={$fresh} aria-label="Yeni parola" id="lab-new-password" name="new-password" class="lab-password" required
        invalid={$fresh.length > 0 && $fresh.length < 8} placeholder="En az 8 karakter" autocomplete="new-password"
        minLength={8} maxLength={32} describedby="lab-password-hint" onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-password-hint" sx={{ text: "sm", color: "muted" }}>{$focused ? "Yazıyorsun" : "Odak dışında"} · {$fresh.length} / 32</span>
    </Row>
    <Row title="Devre dışı ve salt okunur">
      {/* disabled turns off the input and its show / hide button; readonly keeps the text readable but not editable. */}
      <PasswordInput value="eski-parola" disabled aria-label="Kilitli parola" />
      <PasswordInput value="yalniz-okunur" readonly aria-label="Salt okunur parola" />
    </Row>
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <PasswordInput value="gece-yarisi" aria-label="Gece parolası" />
      </Row>
    </Card>
  </div>
}
