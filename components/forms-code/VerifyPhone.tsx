import { CodeInput, Card, Button, Field, toast } from "march/ui"
import { refresh, shieldCheck } from "march/icons"

// kayıt sırasında telefon doğrulama: SMS ile gelen 6 haneli kod; tamamlanınca doğrulanır, yanlışsa hata yazar,
// kod yeniden istenebilir (bu örnekte doğru kod 482915)
export function VerifyPhone() {
  let $code = ""
  let $error = ""
  let $done = false
  let $sent = 1
  const verify = (c: string) => {
    if (c === "482915") { $done = true; $error = ""; toast("Telefonun doğrulandı", { kind: "success" }) }
    else $error = "Kod hatalı; SMS'teki 6 haneyi yeniden gir"
  }
  const resend = () => { $sent++; $code = ""; $error = ""; toast(`Yeni kod gönderildi (${$sent}. SMS)`) }
  return <Card title="Telefonunu doğrula" subtitle="+90 532 ••• •• 33 numarasına bir kod gönderdik">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Doğrulama kodu" error={$error || null} group>
        <CodeInput bind:value={$code} length={6} groups={[3, 3]} onComplete={verify} disabled={$done} />
      </Field>
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        <Button variant="ghost" icon={refresh} disabled={$done} on:click={resend}>Kodu yeniden gönder</Button>
        <Button variant="primary" icon={shieldCheck} disabled={!$done}>Devam et</Button>
      </div>
    </div>
  </Card>
}
