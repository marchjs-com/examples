import { CtaBand } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"
import { arrowRight, play } from "march/icons"

// CtaBand'in bütün özellikleri bir arada: başlık, açıklama, eylemler (nesne ya da düğüm), not, beş arka plan, video,
// hiza, süs katmanları, giriş hareketi ve sınıf
const VARIANTS = [{ value: "gradient", label: "gradyan" }, { value: "mesh", label: "ağ" }, { value: "glass", label: "cam" }, { value: "plain", label: "sade" }, { value: "video", label: "video" }]

export function CtaBandLab() {
  let $variant = "gradient"
  let $start = false
  let $backdrop = true
  let $motion = false
  let $joined = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Arka plan" options={VARIANTS} bind:value={$variant} />
        <Toggle label="Başa hizala" bind:value={$start} />
        <Toggle label="Süs katmanları" bind:value={$backdrop} />
        <Toggle label="Giriş hareketi" bind:value={$motion} />
      </div>
    </Card>
    {() => {
      // sinyaller burada okunur: değişince bant yeniden çizilir (başlık ve not işlev: kendiliğinden güncellenir)
      const variant = $variant, start = $start, backdrop = $backdrop, motion = $motion
      return <CtaBand class="lab-cta" variant={variant as "gradient"} align={start ? "start" : "center"} backdrop={backdrop}
        reveal={motion ? "blur" : "none"} video={{ src: "/media/hadi-waves.webm", poster: "/media/hadi-waves.jpg" }}
        title={() => `Bugün ${$joined} kişi katıldı`} lead="Sen de aramıza katıl, ilk hafta ücretsiz."
        actions={[
          { label: "Katıl", iconEnd: arrowRight, onClick: () => $joined++ },
          { label: "Tanıtım", icon: play, variant: "secondary" },
          <Button variant="link" href="#sss" class="lab-faq">Sık sorulanlar</Button> as Node,
        ]}
        note={() => ($joined ? "Teşekkürler!" : "Kart gerekmez")} />
    }}
  </div>
}
