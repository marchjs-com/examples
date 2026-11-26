// ScrollToTopLab: the full-featured ScrollToTop example; it uses every prop at least once.
//
// Props shown here: threshold, order, inline, target, label, icon (an icon or your own text), motion (the default,
// "fade", "slide", "none" or your own function), smooth, class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ScrollToTopLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ScrollToTop, Card } from "march/ui"
import { animate } from "march/motion"
import { chevronUp, rotateCcw } from "march/icons"

export function ScrollToTopLab() {
  // `let $top` is a March signal: the scroll handler writes it and the scroll-position line redraws.
  let $top = 0
  // The scrolling box shared by five buttons. They get it as `target`, so it must exist as an element first. It scrolls
  // because of its fixed height and overflow: auto. class="lab-box" lets the tests find it.
  const box = (<div class="lab-box" style={{ height: "160px", overflow: "auto" }} on:scroll={(e: Event) => { $top = Math.round((e.currentTarget as HTMLElement).scrollTop) }}>
    {Array.from({ length: 30 }, (_, i) => <p>{`Satır ${i + 1}: aşağı kaydır, düğmeler eşiklerine göre sırayla belirsin.`}</p>)}
  </div>) as HTMLElement
  // Your own motion: `motion` may be a function (el, shown) that runs when the button appears or disappears. Use
  // animate() from march/motion so the motion engine still applies reduced motion, the global speed and "Stop all".
  // Here it turns in while coming and turns out while going; fill: "forwards" keeps the final state.
  const spin = (el: HTMLElement, shown: boolean) => animate(el, shown
    ? [{ opacity: 0, transform: "rotate(-180deg) scale(0.6)" }, { opacity: 1, transform: "none" }]
    : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "rotate(180deg) scale(0.6)" }], { duration: 400, fill: "forwards" })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The page-corner button: no `inline`, so it puts itself into the bottom-end corner of the page and appears once
        the page is scrolled 200 px. order={-1} places it nearer the corner edge than other corner buttons (lower is
        nearer). It follows whatever scrolled last. */}
    <ScrollToTop order={-1} threshold={200} label="Sayfanın başına" />
    <span sx={{ text: "sm", color: "muted" }}>{`Kaydırma: ${$top} px`}</span>
    {/* Five inline buttons watch the same box (target={box}) and each appears at its own threshold, so scrolling shows
        them one after another:
        - 1: the defaults for motion and icon.
        - 2: motion="fade", icon={chevronUp} (any icon) and m:color="brand-blue" (a common prop: the colour token).
        - 3: motion="slide" with m:color="brand-green".
        - 4: motion={spin}, your own function from above.
        - 5: motion="none" (no animation at all), smooth={false} (the scroll jumps to the top at once), icon="⇧" (your
          own text instead of an icon) and class="lab-instant" (an extra class on the button for tests or CSS).
        Every one has a `label`, its accessible name and tooltip; while hidden a button is inert. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <ScrollToTop inline target={box} threshold={40} label="Zıplayarak (pop, 40 px)" />
      <ScrollToTop inline target={box} threshold={120} label="Belirerek (fade, 120 px)" motion="fade" icon={chevronUp} m:color="brand-blue" />
      <ScrollToTop inline target={box} threshold={200} label="Kayarak (slide, 200 px)" motion="slide" m:color="brand-green" />
      <ScrollToTop inline target={box} threshold={280} label="Dönerek (kendi hareketim)" motion={spin} icon={rotateCcw} m:color="brand-purple" />
      <ScrollToTop inline target={box} threshold={360} label="Hemen (hareketsiz)" motion="none" smooth={false} icon="⇧" class="lab-instant" />
    </div>
    {/* m:theme="night" draws the card and the box inside it in the dark theme. */}
    <Card m:theme="night">{box}</Card>
  </div>
}
