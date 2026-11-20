import { PageDots, Toggle, Card } from "march/ui"

// PageDots'un bütün özellikleri bir arada: count, value, bind:value (setValue), onChange, labels (group, page,
// status), size, variant, orientation, dot (kendi içerik, etkin olanı bilir), decorative, disabled, class ve renk (m:color)

// bir sıra: adı üstte, noktalar altta
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PageDotsLab() {
  let $photo = 0
  let $chapter = 0
  let $locked = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Tıklanır (bind:value), büyük, mavi">
      <PageDots count={5} bind:value={$photo} size="lg" m:color="brand-blue" class="lab-gallery" disabled={$locked}
        labels={{ group: "Galeri sayfaları", page: (n: number) => `Fotoğraf ${n}` }} />
    </Row>
    <Toggle bind:value={$locked} label="Galeriyi kilitle (disabled)" />
    <Row title="Salt okunur (value), eşit noktalar, küçük">
      <PageDots count={5} value={$photo} variant="dot" size="sm" labels={{ status: (n: number, c: number) => `Konum: ${n} / ${c}` }} />
    </Row>
    <span sx={{ text: "sm" }}>{`Seçili: ${$photo + 1} / 5`}</span>
    <Row title="Kendi içerik (dot), dikey, onChange">
      <PageDots count={4} value={$chapter} onChange={(i: number) => $chapter = i} orientation="vertical" variant="pill" size="md"
        dot={(i: number, active: () => boolean) => () => (active() ? "★" : String(i + 1))} labels={{ page: (n: number) => `Bölüm ${n}` }} />
    </Row>
    <Card m:theme="night">
      <Row title="Süs (decorative) ve kilitli (disabled)">
        <PageDots count={3} value={1} decorative class="lab-decor" m:color="brand-gold" />
        <PageDots count={3} value={0} onChange={() => {}} disabled labels={{ group: "Kilitli noktalar", page: (n: number) => `Kilitli ${n}` }} />
      </Row>
    </Card>
  </div>
}
