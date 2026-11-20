import { SiteSection } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"

// SiteSection'ın bütün özellikleri bir arada: üst satır, başlık, açıklama, hiza, ton, genişlik, dikey boşluk, başlık
// düzeyi, giriş hareketi, kimlik (çapa), sınıf, içerik ve bölüme geçen ek öznitelikler (data-*, aria-*)
const TONES = ["plain", "muted", "brand", "inverse"] as const

export function SiteSectionLab() {
  let $tone: (typeof TONES)[number] = "muted"
  let $start = false
  let $wide = false
  let $h3 = false
  let $reveal = false
  let $visits = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Ton" options={TONES.map((t) => ({ value: t, label: t }))} bind:value={$tone} />
        <Toggle label="Başa hizala" bind:value={$start} />
        <Toggle label="Geniş" bind:value={$wide} />
        <Toggle label="Üçüncü düzey" bind:value={$h3} />
        <Toggle label="Giriş hareketi" bind:value={$reveal} />
      </div>
    </Card>
    {() => {
      const tone = $tone, start = $start, wide = $wide, h3 = $h3, reveal = $reveal
      return <SiteSection class="lab-ss" id="ozellikler" data-section="features" aria-describedby="lab-ss-note"
        eyebrow="Özellikler" title={() => `Her şey tek yerde (${$visits})`} lead="Takvim, sohbet ve ödeme aynı uygulamada."
        align={start ? "start" : "center"} tone={tone} width={wide ? "wide" : "narrow"} space="sm" level={h3 ? 3 : 2}
        reveal={reveal ? { effect: "blur", stagger: 120 } : false}>
        <p id="lab-ss-note" sx={{ text: "center" }}>Bölümün içeriği burada.</p>
        <Button on:click={() => $visits++}>Uğradım</Button>
      </SiteSection>
    }}
  </div>
}
