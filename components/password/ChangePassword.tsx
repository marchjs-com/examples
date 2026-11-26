// ChangePassword: the real-life PasswordInput example.
//
// Changing the password in account settings: the current password, the new one and a repeat. If the repeat does not match, its
// field shows an error; when everything is right the button turns on. Use this pattern for any "set a password" form: the
// `autocomplete` values tell password managers which field is which.
import { PasswordInput, Field, Button, Card, toast } from "march/ui"
import { lock } from "march/icons"

export function ChangePassword() {
  // The three fields. The values below are derived from them, so they are recalculated on every keystroke:
  // $mismatch is true when the repeat is filled in and different; $ready needs a current password, a new one of at least
  // 8 characters that differs from the old one, and a matching repeat.
  let $current = ""
  let $next = ""
  let $again = ""
  const $mismatch = $again !== "" && $again !== $next
  const $ready = $current !== "" && $next.length >= 8 && $again === $next && $next !== $current
  // After saving, tell the user (the toast is the feedback) and clear all three fields.
  const save = () => {
    toast("Parolan değiştirildi; diğer cihazlarda yeniden giriş yapman gerekecek", { kind: "success" })
    $current = ""; $next = ""; $again = ""
  }
  return <Card title="Parolanı değiştir" subtitle="Hesap › Güvenlik">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field draws the visible label (and links it to the input for screen readers); `help` is the hint text under it.
          The first field keeps the default autocomplete ("current-password"), so a password manager fills the old password. */}
      <Field label="Şu anki parola"><PasswordInput bind:value={$current} /></Field>
      {/* autocomplete="new-password": password managers offer to generate a password here instead of filling an old one.
          minLength={8}: the browser's own minimum length. */}
      <Field label="Yeni parola" help="En az 8 karakter; eskisinden farklı olsun">
        <PasswordInput bind:value={$next} autocomplete="new-password" minLength={8} />
      </Field>
      {/* The Field `error` takes text or null: it shows that message under the field. toggle={false}: no
          show / hide button on the repeat field, so the user types it blind and has to match the first field. */}
      <Field label="Yeni parola (tekrar)" error={$mismatch ? "Parolalar eşleşmiyor" : null}>
        <PasswordInput bind:value={$again} autocomplete="new-password" toggle={false} />
      </Field>
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={lock} disabled={!$ready} on:click={save}>Parolayı değiştir</Button>
      </div>
    </div>
  </Card>
}
