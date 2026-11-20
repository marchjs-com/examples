import { Presentation, Slide, Appear } from "march/landing"
import { Overlay } from "march/ui"

// bir girişimin yatırımcı sunumu: açılış, sorun, çözüm (iki sütun), rakamlar ve kapanış; konuşmacı notlarıyla
export function PitchDeck() {
  let $slide = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <Presentation bind:index={$slide} label="Mahalle Pazarı yatırımcı sunumu" sync="pitch">
      <Slide layout="title" tone="brand" notes="Kendini tanıt, 20 saniye.">
        <h2>Mahalle Pazarı</h2>
        <p>Semt pazarı, kapında. Tohum turu 2026</p>
      </Slide>
      <Slide notes="Sorunu bir hikâyeyle anlat.">
        <h2>Sorun</h2>
        <Appear><li>Pazarcıların %70'i internette yok</li><li>Gençler pazara gidecek vakit bulamıyor</li><li>Her pazar 120 kg ürün çöpe gidiyor</li></Appear>
      </Slide>
      <Slide layout="split" notes="Uygulamayı göster.">
        <div><h2>Çözüm</h2><p>Pazarcı ürününü sabah fotoğraflar, akşam kapına gelir.</p></div>
        <div sx={{ flex: "col", gap: 2, p: 4 }}><strong>🥬 Ispanak · 25 ₺</strong><strong>🍅 Domates · 40 ₺</strong><strong>🧀 Ezine peyniri · 180 ₺</strong></div>
      </Slide>
      <Slide layout="center" tone="inverse" background={<Overlay effect="mesh" opacity={0.35} />} notes="Rakamları yavaş söyle.">
        <h2>12 bin sipariş</h2>
        <p>ilk altı ayda, üç ilçede</p>
      </Slide>
      <Slide layout="title" notes="Teşekkür et, soruları al.">
        <h2>Teşekkürler</h2>
        <p>merhaba@mahallepazari.com</p>
      </Slide>
    </Presentation>
    <p sx={{ color: "muted", text: "sm" }}>Ok tuşları, boşluk ya da kaydırma ile ilerle · şu an {$slide + 1}. slayt</p>
  </div>
}
