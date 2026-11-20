import { PageDots, Card, Button, toast } from "march/ui"
import { arrowRight } from "march/icons"

// bir uygulamanın tanıtım akışı: adımlar salt okunur noktalarla gösterilir (konumu ekran okuyucu "Adım 2 / 4" diye
// duyurur), ilerlemeyi Devam / Atla düğmeleri yapar; son adımda Başla
const steps = [
  { title: "Hoş geldin", text: "Projelerini tek yerden yönet." },
  { title: "Ekibini çağır", text: "Bir bağlantıyla herkes içeride." },
  { title: "Bildirimler", text: "Yalnız senin için önemli olanlar." },
  { title: "Hazırsın", text: "İlk projeni oluşturarak başla." },
]

export function Onboarding() {
  let $step = 0
  const last = () => $step === steps.length - 1
  const next = () => { if (last()) { toast("Hadi başlayalım!"); $step = 0 } else $step++ }
  return <Card title={steps[$step].title}>
    <div sx={{ flex: "col", gap: 4 }}>
      <p sx={{ color: "muted" }}>{steps[$step].text}</p>
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        <PageDots count={steps.length} value={$step} size="sm" labels={{ status: (n: number, c: number) => `Adım ${n} / ${c}` }} />
        <div sx={{ flex: "row", gap: 2 }}>
          <Button variant="ghost" size="sm" disabled={last()} on:click={() => $step = steps.length - 1}>Atla</Button>
          <Button variant="primary" size="sm" iconEnd={arrowRight} on:click={next}>{last() ? "Başla" : "Devam"}</Button>
        </div>
      </div>
    </div>
  </Card>
}
