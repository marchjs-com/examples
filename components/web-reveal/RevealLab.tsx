import { Reveal } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"

// Reveal'in bütün özellikleri bir arada: efekt (hazır, kendi kareleriniz ya da "none"), yumuşatma, ardışık gecikme,
// gecikme, süre, uzaklık, kaydırmaya bağlılık (scrub), kendisi (self), seçici (select), etiket (as), sınıf,
// ek nitelikler (aria-label…) ve içerik (children)
type RevealEffect = "fade" | "up" | "down" | "start" | "end" | "scale" | "blur" | "flip"
const EFFECTS = [
  { value: "up", label: "yukarı" }, { value: "start", label: "baştan" }, { value: "flip", label: "çevirme" },
  { value: "own", label: "dönerek" }, { value: "none", label: "yok" },
]
// kendi başlangıç ve bitiş karelerimiz
const SPIN = { from: { opacity: 0, transform: "rotate(-12deg) scale(.7)" }, to: { opacity: 1, transform: "rotate(0deg) scale(1)" } }

const Tile = (p: { n: number }) => <Card class="lab-card">
  <div sx={{ flex: "col", gap: 1 }}><strong>Kart {p.n}</strong><span sx={{ color: "muted" }}>sırayla girer</span></div>
</Card>

export function RevealLab() {
  let $effect = "up"
  let $scrub = false
  let $self = false
  let $count = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Efekt" options={EFFECTS} bind:value={$effect} />
        <Toggle label="Kaydırmaya bağlı" bind:value={$scrub} />
        <Toggle label="Bütün blok birden" bind:value={$self} />
        <Button size="sm" variant="secondary" on:click={() => $count = $count + 1}>Kart ekle</Button>
      </div>
    </Card>
    {() => {
      // sinyaller burada okunur: değişince blok yeniden çizilir ve girişi yeniden oynar
      const effect = $effect, scrub = $scrub, self = $self, n = $count
      return <Reveal as="section" class="lab-reveal" aria-label="Açılan kartlar"
        effect={effect === "own" ? SPIN : effect as RevealEffect | "none"} easing="spring" stagger={90} delay={60}
        duration={640} distance={40} scrub={scrub} self={self} select=".lab-card">
        <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
          {Array.from({ length: n }, (_, i) => <Tile n={i + 1} />)}
        </div>
      </Reveal>
    }}
  </div>
}
