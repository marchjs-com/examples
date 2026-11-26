// Onboarding: the real-life PageDots example.
//
// The intro flow of an app: four steps shown with read-only dots, while the Continue and Skip buttons do the moving, and
// the last step says Start. Use this pattern when something else drives the progress and the dots only show where you
// are (no onChange, so they are not buttons).
import { PageDots, Card, Button, toast } from "march/ui"
import { arrowRight } from "march/icons"

const steps = [
  { title: "Hoş geldin", text: "Projelerini tek yerden yönet." },
  { title: "Ekibini çağır", text: "Bir bağlantıyla herkes içeride." },
  { title: "Bildirimler", text: "Yalnız senin için önemli olanlar." },
  { title: "Hazırsın", text: "İlk projeni oluşturarak başla." },
]

export function Onboarding() {
  // The current step (0-based). `last` and `next` are small helpers: on the last step "next" finishes and starts over.
  let $step = 0
  const last = () => $step === steps.length - 1
  const next = () => { if (last()) { toast("Hadi başlayalım!"); $step = 0 } else $step++ }
  return <Card title={steps[$step].title}>
    <div sx={{ flex: "col", gap: 4 }}>
      <p sx={{ color: "muted" }}>{steps[$step].text}</p>
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        {/* Read-only dots: only `value` is given (no onChange, no bind:value), so they are not buttons; they show
            the position. For screen readers they are one image whose name comes from labels.status, here "step n / count"
            in Turkish. size="sm": the small dots. The current dot is longer and takes the accent colour. Under reduced
            motion the size does not animate. */}
        <PageDots count={steps.length} value={$step} size="sm" labels={{ status: (n: number, c: number) => `Adım ${n} / ${c}` }} />
        <div sx={{ flex: "row", gap: 2 }}>
          {/* Skip jumps to the last step and turns itself off there; the primary button's text follows the step. */}
          <Button variant="ghost" size="sm" disabled={last()} on:click={() => $step = steps.length - 1}>Atla</Button>
          <Button variant="primary" size="sm" iconEnd={arrowRight} on:click={next}>{last() ? "Başla" : "Devam"}</Button>
        </div>
      </div>
    </div>
  </Card>
}
