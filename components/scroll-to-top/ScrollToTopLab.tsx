import { ScrollToTop, Card } from "march/ui"
import { animate } from "march/motion"
import { chevronUp, rotateCcw } from "march/icons"

// ScrollToTop'un bütün özellikleri: threshold, inline, target, label, icon (ikon ya da kendi metnin), motion (pop,
// fade, slide, none ve kendi işlevin), smooth (yumuşak / hemen), class, m:color; inline olmayan biri order ile sayfa
// köşesine yerleşir (önizleme sayfası aşağı kayınca belirir)
export function ScrollToTopLab() {
  let $top = 0
  const box = (<div class="lab-box" style={{ height: "160px", overflow: "auto" }} on:scroll={(e: Event) => { $top = Math.round((e.currentTarget as HTMLElement).scrollTop) }}>
    {Array.from({ length: 30 }, (_, i) => <p>{`Satır ${i + 1}: aşağı kaydır, düğmeler eşiklerine göre sırayla belirsin.`}</p>)}
  </div>) as HTMLElement
  // kendi hareketin: dönerek gelir, dönerek gider
  const spin = (el: HTMLElement, shown: boolean) => animate(el, shown
    ? [{ opacity: 0, transform: "rotate(-180deg) scale(0.6)" }, { opacity: 1, transform: "none" }]
    : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "rotate(180deg) scale(0.6)" }], { duration: 400, fill: "forwards" })
  return <div sx={{ flex: "col", gap: 3 }}>
    <ScrollToTop order={-1} threshold={200} label="Sayfanın başına" />
    <span sx={{ text: "sm", color: "muted" }}>{`Kaydırma: ${$top} px`}</span>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <ScrollToTop inline target={box} threshold={40} label="Zıplayarak (pop, 40 px)" />
      <ScrollToTop inline target={box} threshold={120} label="Belirerek (fade, 120 px)" motion="fade" icon={chevronUp} m:color="brand-blue" />
      <ScrollToTop inline target={box} threshold={200} label="Kayarak (slide, 200 px)" motion="slide" m:color="brand-green" />
      <ScrollToTop inline target={box} threshold={280} label="Dönerek (kendi hareketim)" motion={spin} icon={rotateCcw} m:color="brand-purple" />
      <ScrollToTop inline target={box} threshold={360} label="Hemen (hareketsiz)" motion="none" smooth={false} icon="⇧" class="lab-instant" />
    </div>
    <Card m:theme="night">{box}</Card>
  </div>
}
