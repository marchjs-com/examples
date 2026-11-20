import { Rating, Card } from "march/ui"
import { heart } from "march/icons"

// Rating'in bütün özellikleri: bind:value (value + setValue) ve onChange, grubun adı (label), işaretlerin adı
// (starLabel), boyut, işaret sayısı (max), salt okunur kesirli puan (4,5 · 2,3), kendi işaretin (icon / iconOn: ikon
// ya da (n) => çizim), hareketsiz (animate={false}), sınıf, renk (m:color) ve koyu zemin
const sizes = ["sm", "md", "lg"] as const

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function RatingLab() {
  let $score = 3
  let $changes = 0
  let $service = 7
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Değer (bind:value + onChange)">
      <Rating bind:value={$score} onChange={() => $changes++} label="Genel puan" size="lg" class="lab-rating"
        starLabel={(n: number, max: number) => `${max} üzerinden ${n}`} />
      <span>Puan: {$score}</span>
      <span>Değişiklik: {$changes}</span>
    </Row>
    <Row title="Boyut">{sizes.map((s) => <Rating value={4} readonly size={s} label={`Boyut ${s}`} />)}</Row>
    <Row title="İşaret sayısı (max) ve renk">
      <Rating bind:value={$service} max={10} label="Hizmet puanı" m:color="brand-blue" starLabel={(n: number) => `Hizmet ${n}`} />
      <span>Hizmet: {$service} / 10</span>
    </Row>
    <Row title="Salt okunur, kesirli">
      <Rating value={4.5} readonly label="Ortalama 4,5" m:color="brand-gold" />
      <Rating value={2.3} readonly label="Ortalama 2,3" size="sm" />
    </Row>
    <Row title="Kendi işaretin">
      <Rating bind:value={$score} icon={heart} m:color="danger" label="Sevgi" starLabel={(n: number) => `${n} kalp`} />
      <Rating bind:value={$score} icon={(n: number) => <b>{n}</b>} iconOn={(n: number) => <b>{n}✓</b>} m:color="brand-green" label="Sayılarla"
        starLabel={(n: number) => `Sayı ${n}`} />
    </Row>
    <Row title="Hareketsiz (animate={false})">
      <Rating bind:value={$score} animate={false} label="Hareketsiz" starLabel={(n: number) => `Hareketsiz ${n}`} />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Rating bind:value={$score} m:color="brand-orange" label="Gece puanı" starLabel={(n: number) => `Gece ${n}`} />
      </Row>
    </Card>
  </div>
}
