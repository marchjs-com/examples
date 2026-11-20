import { PasswordInput, Field, Button, Card, toast } from "march/ui"
import { lock } from "march/icons"

// hesap ayarlarında parola değiştirme: şu anki parola, yeni parola ve tekrarı; tekrar tutmazsa alan hata gösterir,
// her şey yerindeyken düğme açılır
export function ChangePassword() {
  let $current = ""
  let $next = ""
  let $again = ""
  const $mismatch = $again !== "" && $again !== $next
  const $ready = $current !== "" && $next.length >= 8 && $again === $next && $next !== $current
  const save = () => {
    toast("Parolan değiştirildi; diğer cihazlarda yeniden giriş yapman gerekecek", { kind: "success" })
    $current = ""; $next = ""; $again = ""
  }
  return <Card title="Parolanı değiştir" subtitle="Hesap › Güvenlik">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Şu anki parola"><PasswordInput bind:value={$current} /></Field>
      <Field label="Yeni parola" help="En az 8 karakter; eskisinden farklı olsun">
        <PasswordInput bind:value={$next} autocomplete="new-password" minLength={8} />
      </Field>
      <Field label="Yeni parola (tekrar)" error={$mismatch ? "Parolalar eşleşmiyor" : null}>
        <PasswordInput bind:value={$again} autocomplete="new-password" toggle={false} />
      </Field>
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={lock} disabled={!$ready} on:click={save}>Parolayı değiştir</Button>
      </div>
    </div>
  </Card>
}
