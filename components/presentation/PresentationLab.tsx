import { Presentation, Slide, Appear } from "march/landing"
import { Segmented, Toggle, Card, Overlay } from "march/ui"
import { arrowLeft, arrowRight, monitor, maximize } from "march/icons"
import { animate } from "march/motion"

// Presentation'ın bütün özellikleri bir arada: denetimli sıra (bind:index = index + setIndex), geçiş (hazır ya da
// kendi işlevin), konuşmacı görünümü, eşitleme (sync), konuşmacı adresi, ad, denetimler, sayaç, ilerleme çizgisi ve
// rengi, tam ekran, süre sayacı, ikonlar, kendi metinler, sınıf; Slide (notes, layout, tone, background, class) ve
// Appear (as, effect, class)
const TRANSITIONS = [{ value: "slide", label: "kaydır" }, { value: "fade", label: "sol" }, { value: "own", label: "dönerek" }, { value: "none", label: "yok" }]

// kendi geçişimiz: yeni slayt yöne göre döner gibi girer
const turn = (incoming: HTMLElement, _out: HTMLElement | undefined, dir: 1 | -1): void => {
  animate(incoming, { opacity: [0, 1], transform: [`rotate(${6 * dir}deg) scale(.8)`, "rotate(0deg) scale(1)"] }, { duration: 400, easing: "expo" })
}

export function PresentationLab() {
  let $slide = 0
  let $transition = "slide"
  let $controls = true
  let $presenter = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Geçiş" options={TRANSITIONS} bind:value={$transition} />
        <Toggle label="Denetimler" bind:value={$controls} />
        <Toggle label="Konuşmacı görünümü" bind:value={$presenter} />
      </div>
      <p sx={{ color: "muted" }}>Dışarıdaki sıra: {$slide + 1}</p>
    </Card>
    {() => {
      // sinyaller burada okunur (sıra hariç: o bind:index ile canlı akar)
      const tr = $transition, controls = $controls, presenter = $presenter
      return <Presentation class="lab-deck" bind:index={$slide} label="Deneme sunumu" sync="lab-deck"
        transition={tr === "own" ? turn : tr as "slide"} presenter={presenter} presenterUrl="#konusmaci"
        controls={controls} counter={(i: number, n: number) => `${i + 1} / ${n}`} progress progressColor="brand-purple"
        fullscreen timer={false} icons={{ previous: arrowLeft, next: arrowRight, speaker: monitor, fullscreen: maximize }}
        labels={{ previous: "Önceki", next: "Sonraki", speaker: "Konuşmacı penceresi", fullscreen: "Tam ekran", pages: "Slaytlar",
          deck: "slayt destesi", speakerView: "Konuşmacı", upNext: "Sıradaki", end: "Son slayt", notes: "Notlar", noNotes: "Not yok", elapsed: "Geçen süre" }}>
        <Slide layout="title" tone="brand" notes="Merhaba de" class="lab-first"><h2>Deneme sunumu</h2><p>Sağ ok ile ilerle</p></Slide>
        <Slide notes="Maddeler birer birer"><h2>Üç madde</h2>
          <Appear effect="fade" class="lab-steps"><li>Bir</li><li>İki</li></Appear>
        </Slide>
        <Slide layout="split"><div><h2>İki sütun</h2></div><Appear as="div" effect="none"><p>Hareketsiz adım</p></Appear></Slide>
        <Slide layout="center" tone="inverse" background={<Overlay effect="dots" opacity={0.4} />}><h2>Son</h2></Slide>
      </Presentation>
    }}
  </div>
}
