// CarouselLab: the full-featured Carousel example; it uses every prop at least once.
//
// Props shown here: label, perView (1-4), class, children (nodes or plain text), labels, arrows, prevIcon / nextIcon,
// dots (true, false or your own content), smooth, swipe ("touch", true or false) and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CarouselLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Carousel, Card, Button, Segmented } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

// The colour tokens the demo slides cycle through.
const colors = ["brand-orange", "brand-blue", "brand-green", "brand-purple"] as const

// One coloured slide: a Card whose colour token and number follow the slide's index.
const Slide = (props: { n: number }) => <Card m:color={colors[props.n % colors.length]}>
  <strong sx={{ text: "xl", color: colors[props.n % colors.length] }}>{props.n + 1}</strong>
</Card>

export function CarouselLab() {
  // The slides per view and the swipe mode (reactive state), set by the controls above the carousel.
  let $per = 2
  let $swipe = "touch" as "touch" | "mouse" | "off"
  return <div sx={{ flex: "col", gap: 4 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      {[1, 2, 3, 4].map((n) => <Button pressed={$per === n} on:click={() => $per = n}>{`${n} görünen`}</Button>)}
    </div>
    <Segmented aria-label="Kaydırma" size="sm" bind:value={$swipe}
      options={[{ value: "touch", label: "Dokunarak" }, { value: "mouse", label: "Fareyle de" }, { value: "off", label: "Kapalı" }]} />
    {/* The function child builds a fresh carousel whenever perView or swipe change.
        - label: the accessible name of the carousel (a labelled section announced as a carousel).
        - perView: slides per view on wide screens, 1 to 4 (phones show one slide and a peek of the next).
        - class: added to the root so CSS or a test can find it. m:color: the colour token of the buttons and dots.
        - swipe: "touch" (default) swipes by touch only, true lets the mouse drag too, false turns swiping off, leaving
          the buttons, the dots and the arrow keys.
        - labels: the accessible names of the previous and next buttons and of each dot (a function of the slide number).
        - prevIcon / nextIcon: what the buttons show instead of the chevrons.
        - dots as a function: draws your own content in each dot button (here a filled circle for the active one and the
          slide number for the others); true gives the default dots and false removes them.
        - The children are the slides. */}
    {() => <Carousel label="Renkli kartlar" perView={$per as 1} class="lab-main" m:color="brand-purple"
      swipe={$swipe === "mouse" ? true : $swipe === "off" ? false : "touch"}
      labels={{ previous: "Geri", next: "İleri", slide: (n: number) => `Kart ${n}` }}
      prevIcon={arrowLeft} nextIcon={arrowRight} dots={(i: number, active: () => boolean) => (active() ? "●" : String(i + 1))}>
      {Array.from({ length: 6 }, (_, i) => <Slide n={i} />)}
    </Carousel>}
    {/* The second carousel shows the "off" switches: arrows={false} and dots={false} remove the buttons and the dots,
        and smooth={false} makes scrolling jump instead of glide (for reduced motion needs you can also rely on the
        browser setting, which the carousel follows). Plain text children each become a slide box of their own. */}
    <Carousel label="Oksuz ve noktasız, anında" arrows={false} dots={false} smooth={false} class="lab-bare">
      {["Bir", "İki", "Üç", "Dört"]}
    </Carousel>
  </div>
}
