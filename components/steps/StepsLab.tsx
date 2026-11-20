import { Steps, Button, Card } from "march/ui"
import { user, mail, flag, star } from "march/icons"

// Steps'in bütün özellikleri bir arada: steps (title, description, icon), current, onSelect (adımlar düğme olur),
// vertical, doneIcon (ikon, kısa metin ya da false: numara kalır), renderDot (kendi nokta içeriğin), connector, class, m:color
const SIGNUP = [
  { title: "Hesap", description: "E-posta", icon: user },
  { title: "Doğrula", description: "Kod", icon: mail },
  { title: "Başla", description: "Hazır", icon: flag },
]
const BASE = [{ title: "Sepet" }, { title: "Ödeme" }, { title: "Teslim" }]

// bir örnek ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function StepsLab() {
  let $step = 1
  let $picked = "Doğrula"
  const pick = (i: number) => { $step = i; $picked = SIGNUP[i]?.title ?? "" }
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Tıklanabilir (onSelect), ikon ve açıklama">
      <Steps steps={SIGNUP} current={$step} onSelect={pick} class="lab-steps" />
    </Row>
    <span>{"Seçilen: " + $picked}</span>
    <Row title="Kendi işaretin: ikon (yıldız) ve kısa metin">
      <Steps steps={BASE} current={$step} doneIcon={star} m:color="brand-gold" class="lab-star" />
      <Steps steps={BASE} current={$step} doneIcon="✔" m:color="brand-green" class="lab-text" />
    </Row>
    <Row title="Numara kalsın, çizgi yok (doneIcon={false}, connector={false})">
      <Steps steps={BASE} current={$step} doneIcon={false} connector={false} class="lab-numbers" />
    </Row>
    <Row title="Kendi nokta içeriğin (renderDot)">
      <Steps steps={BASE} current={$step} renderDot={(i: number, state: string) => (state === "done" ? "★" : "ABC"[i])} m:color="brand-purple" class="lab-dots" />
    </Row>
    <Card m:theme="night">
      <Row title="Dikey, koyu zemin">
        <Steps steps={SIGNUP} current={$step} vertical m:color="brand-blue" class="lab-vertical" />
      </Row>
    </Card>
    <div sx={{ flex: ["row", "between"], gap: 2 }}>
      <Button size="sm" disabled={$step === 0} on:click={() => $step--}>Geri</Button>
      <Button size="sm" variant="primary" disabled={$step >= SIGNUP.length} on:click={() => $step++}>İleri</Button>
    </div>
  </div>
}
