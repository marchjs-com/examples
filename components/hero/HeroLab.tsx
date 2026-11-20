import { Hero } from "march/landing"
import { Segmented, Toggle, Card } from "march/ui"
import { arrowRight, play } from "march/icons"

// Hero'nun bütün özellikleri bir arada: yedi görünüm, hiza, yükseklik, başlık düzeyi, üst etiket bağlantısı ve oku,
// vurgu, açıklama, eylemler, not, medya, video, parallax katmanları, aurora renkleri, süs katmanları, giriş hareketi,
// pencere çubuğu, eğim, sınıf ve içerik (children). Hero çoğu prop'u bir kez okur: durumları {() => …} bloğunda
// okuyunca, biri değişince Hero yeniden çizilir
const VARIANTS = ["centered", "split", "video", "mesh", "aurora", "product", "parallax"] as const

const Screen = () => <div sx={{ flex: ["col", "center"], gap: 2, p: 6 }} aria-label="Uygulama ekranı" role="img">
  <strong>Bugünün etkinlikleri</strong><span sx={{ color: "muted" }}>3 yeni buluşma</span>
</div>

export function HeroLab() {
  let $variant: (typeof VARIANTS)[number] = "product"
  let $start = false
  let $backdrop = true
  let $tilt = true
  let $bar = true
  let $joined = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Toggle label="Başa hizala" bind:value={$start} />
        <Toggle label="Süs katmanları" bind:value={$backdrop} />
        <Toggle label="Eğim" bind:value={$tilt} />
        <Toggle label="Pencere çubuğu" bind:value={$bar} />
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince Hero yeniden çizilir
      const variant = $variant, start = $start, backdrop = $backdrop, tilt = $tilt, bar = $bar, joined = $joined
      return <Hero variant={variant} align={start ? "start" : "center"} size="md" level={2} class="lab-hero"
      eyebrow="Yeni: canlı etkinlikler" eyebrowHref="#yenilikler" eyebrowArrow={<span aria-hidden="true">↗</span>}
      title="Bugün kiminle buluşuyorsun?" highlight="buluşuyorsun"
      lead="Yakınındaki etkinlikleri bul, bir dokunuşla katıl."
      actions={[{ label: `Katıl (${joined})`, iconEnd: arrowRight, onClick: () => $joined++ }, { label: "Tanıtımı izle", icon: play, variant: "secondary" }]}
      note="Ücretsiz · kart gerekmez" media={<Screen /> as Node}
      video={{ src: "/media/hadi-waves.webm", poster: "/media/hadi-waves.jpg" }}
      layers={[{ content: <div class="lab-sky" style={{ inlineSize: "100%", blockSize: "100%" }} />, speed: 0.4 }]}
      colors={["#ff7a59", "#7c5cff", "#2bb8ff"]} backdrop={backdrop} reveal="blur" frameBar={bar} tilt={tilt}>
      <small sx={{ color: "muted" }}>12 şehirde, 40 bin kişi</small>
    </Hero>
    }}
  </div>
}
