import { Carousel, Card, Button, Segmented } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

// Carousel'in bütün özellikleri bir arada: label, perView (1–4), class, children (düğüm ya da metin), labels,
// arrows, prevIcon / nextIcon, dots (true / false / kendi içeriğin), smooth, swipe ("touch" / true / false) ve m:color
const colors = ["brand-orange", "brand-blue", "brand-green", "brand-purple"] as const

// renkli bir slayt
const Slide = (props: { n: number }) => <Card m:color={colors[props.n % colors.length]}>
  <strong sx={{ text: "xl", color: colors[props.n % colors.length] }}>{props.n + 1}</strong>
</Card>

export function CarouselLab() {
  let $per = 2
  let $swipe = "touch" as "touch" | "mouse" | "off"
  return <div sx={{ flex: "col", gap: 4 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      {[1, 2, 3, 4].map((n) => <Button pressed={$per === n} on:click={() => $per = n}>{`${n} görünen`}</Button>)}
    </div>
    <Segmented aria-label="Kaydırma" size="sm" bind:value={$swipe}
      options={[{ value: "touch", label: "Dokunarak" }, { value: "mouse", label: "Fareyle de" }, { value: "off", label: "Kapalı" }]} />
    {() => <Carousel label="Renkli kartlar" perView={$per as 1} class="lab-main" m:color="brand-purple"
      swipe={$swipe === "mouse" ? true : $swipe === "off" ? false : "touch"}
      labels={{ previous: "Geri", next: "İleri", slide: (n: number) => `Kart ${n}` }}
      prevIcon={arrowLeft} nextIcon={arrowRight} dots={(i: number, active: () => boolean) => (active() ? "●" : String(i + 1))}>
      {Array.from({ length: 6 }, (_, i) => <Slide n={i} />)}
    </Carousel>}
    <Carousel label="Oksuz ve noktasız, anında" arrows={false} dots={false} smooth={false} class="lab-bare">
      {["Bir", "İki", "Üç", "Dört"]}
    </Carousel>
  </div>
}
