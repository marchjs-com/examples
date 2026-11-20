import { CheckMark, Button, Card } from "march/ui"
import { heart, trash, more } from "march/icons"

// CheckMark'ın bütün özellikleri bir arada: value (true / false / "partial"), labels, label (metin ya da false: süs),
// text (metni göster), icons (kendi glifler, metin ya da false), variant (plain, soft, solid, bare), size, motion
// (flip, fade, pop, draw, none, kendi fonksiyonun), class, diğer öznitelikler ve m:color
const variants = ["plain", "soft", "solid", "bare"] as const
const sizes = ["sm", "md", "lg"] as const
const motions = ["flip", "fade", "pop", "draw", "none"] as const

// bir sıra işaret ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

// kendi geçişim: yeni glif yukarıdan kayarak gelir (eski glif söz bitince kalkar)
const slide = (next: HTMLElement, prev: HTMLElement) => {
  prev.style.opacity = "0"
  next.animate([{ transform: "translateY(-8px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 250 })
  return new Promise((done) => setTimeout(done, 250))
}

export function CheckMarkLab() {
  let $on = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Değer ve metin">
      <CheckMark value text />
      <CheckMark value={false} text />
      <CheckMark value="partial" text />
      <CheckMark value text labels={{ yes: "Dahil", no: "Yok", partial: "Kısmen" }} />
      <CheckMark value label="Ödendi" text class="lab-paid" data-row="7" />
      <CheckMark value={false} label={false} class="lab-decor" />
    </Row>
    <Row title="Görünüm">{variants.map((v) => <CheckMark value variant={v} label={`Görünüm ${v}`} />)}</Row>
    <Row title="Boyut">{sizes.map((s) => <CheckMark value="partial" variant="soft" size={s} label={`Boyut ${s}`} />)}</Row>
    <Row title="Kendi işaretleri">
      <CheckMark value icons={{ yes: heart, no: trash, partial: more }} m:color="brand-purple" variant="soft" />
      <CheckMark value={false} icons={{ no: "👎" }} />
      <CheckMark value icons={{ yes: false }} label="İşaretsiz evet" text />
    </Row>
    <Row title="Geçiş hareketi">
      <Button size="sm" on:click={() => $on = !$on}>{() => ($on ? "Hepsini kapat" : "Hepsini aç")}</Button>
      {motions.map((m) => <CheckMark value={() => $on} motion={m} variant="soft" text labels={{ yes: m, no: m }} />)}
      <CheckMark value={() => $on} motion={slide} variant="solid" label="Kendi hareketim" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">{variants.map((v) => <CheckMark value={() => $on} variant={v} motion="pop" />)}</Row>
    </Card>
  </div>
}
