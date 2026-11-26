// VerifyPhone: the real-life CodeInput example.
//
// What it shows: phone verification during sign-up. A six-digit code arrives by SMS; when all boxes are filled it is
// checked, a wrong code shows an error under the boxes, and the code can be requested again. In this example the correct
// code is fixed so you can try it.
// When to use this pattern: one-time codes. Put the CodeInput in a Field so the label and the error message are linked to
// it; `groups={[3, 3]}` splits six boxes into two groups of three for easy reading.
// Accessibility: the numeric keypad and one-time-code autofill are used for numeric codes (see the CodeInput docs).
import { CodeInput, Card, Button, Field, toast } from "march/ui"
import { refresh, shieldCheck } from "march/icons"

export function VerifyPhone() {
  // State: the code, the error text, whether verification is done and how many SMS were sent.
  let $code = ""
  let $error = ""
  let $done = false
  let $sent = 1
  // onComplete handler: the right code marks us done and clears the error; any other code shows the error text.
  const verify = (c: string) => {
    if (c === "482915") { $done = true; $error = ""; toast("Telefonun doğrulandı", { kind: "success" }) }
    else $error = "Kod hatalı; SMS'teki 6 haneyi yeniden gir"
  }
  // Asking for a new code resets the boxes and the error and counts the SMS.
  const resend = () => { $sent++; $code = ""; $error = ""; toast(`Yeni kod gönderildi (${$sent}. SMS)`) }
  return <Card title="Telefonunu doğrula" subtitle="+90 532 ••• •• 33 numarasına bir kod gönderdik">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field shows the label and the error (null means no error) and groups the boxes for assistive technology. */}
      <Field label="Doğrulama kodu" error={$error || null} group>
        {/* length={6} with groups={[3, 3]}; onComplete runs the check; disabled once verified. */}
        <CodeInput bind:value={$code} length={6} groups={[3, 3]} onComplete={verify} disabled={$done} />
      </Field>
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        {/* Resend is disabled after success; the Continue button is enabled only after success. */}
        <Button variant="ghost" icon={refresh} disabled={$done} on:click={resend}>Kodu yeniden gönder</Button>
        <Button variant="primary" icon={shieldCheck} disabled={!$done}>Devam et</Button>
      </div>
    </div>
  </Card>
}
