import { Chevron, Button, Card } from "march/ui"
import { arrowRight } from "march/icons"

// Chevron'un bütün özellikleri bir arada: open (dışarıdan), direction (dört yön), size (dört boyut),
// motion (yumuşak, yaylı, false: sıçrar), icon (kendi ikonun ya da metin), leaf (yer tutar, çizmez), class,
// m:color, öteki öznitelikler (data-*) ve open verilmeyince en yakın aria-expanded'ı izlemesi
const directions = ["end", "start", "down", "up"] as const
const sizes = ["xs", "sm", "md", "lg"] as const

// bir sıra ok ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function ChevronLab() {
  let $open = false
  let $leaf = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button variant="secondary" on:click={() => $open = !$open}>{$open ? "Hepsini kapat" : "Hepsini aç"}</Button>
      <Button variant="ghost" on:click={() => $leaf = !$leaf}>{$leaf ? "Oku geri getir" : "Yaprak yap"}</Button>
    </div>
    <Row title="Yön (direction): kapalıyken baktığı yer">
      {directions.map((d) => <Chevron open={$open} direction={d} size="md" class={`lab-dir-${d}`} />)}
    </Row>
    <Row title="Boyut (size)">{sizes.map((s) => <Chevron open={$open} size={s} />)}</Row>
    <Row title="Dönüş (motion)">
      <Chevron open={$open} size="lg" motion="smooth" />
      <Chevron open={$open} size="lg" motion="spring" />
      <Chevron open={$open} size="lg" motion={false} class="lab-still" />
    </Row>
    <Row title="Kendi ikonun (icon) ve renk (m:color)">
      <Chevron open={$open} size="lg" icon={arrowRight} m:color="primary" class="lab-own" />
      <Chevron open={$open} size="lg" icon="›" m:color="brand-orange" class="lab-text" />
    </Row>
    <Row title="Yaprak (leaf) ve öznitelik (data-*)">
      <span sx={{ flex: ["row", "center"], gap: 1 }}><Chevron open={$open} leaf={$leaf} data-node="kok" class="lab-leaf" /> Kök klasör</span>
    </Row>
    <Card m:theme="night">
      <Row title="open yok: düğmenin aria-expanded'ını izler">
        <Button variant="ghost" aria-expanded={$open ? "true" : "false"} on:click={() => $open = !$open}>
          Ayrıntılar <Chevron direction="down" class="lab-auto" />
        </Button>
      </Row>
    </Card>
  </div>
}
