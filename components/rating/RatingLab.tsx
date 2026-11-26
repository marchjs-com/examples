// RatingLab: the full-featured Rating example; it uses every prop at least once.
//
// Props shown here: bind:value (value + setValue) and onChange, label, starLabel, size, max, readonly with fractional
// values, icon / iconOn (an icon, or a function that draws the mark), animate, class, m:color, and a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// RatingLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { Rating, Card } from "march/ui"
import { heart } from "march/icons"

// The three sizes.
const sizes = ["sm", "md", "lg"] as const

// A small helper: a muted title with its examples in a row under it.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function RatingLab() {
  // One score shared by several Ratings below, to show that they follow the same signal.
  let $score = 3
  // How many times onChange fired.
  let $changes = 0
  // The score of the ten-mark Rating.
  let $service = 7
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* bind:value: two-way score; onChange: called on every change; label: the accessible name of the group; size;
        class: on the root; starLabel(n, max): the accessible name of each mark. */}
    <Row title="Değer (bind:value + onChange)">
      <Rating bind:value={$score} onChange={() => $changes++} label="Genel puan" size="lg" class="lab-rating"
        starLabel={(n: number, max: number) => `${max} üzerinden ${n}`} />
      <span>Puan: {$score}</span>
      <span>Değişiklik: {$changes}</span>
    </Row>
    {/* Read-only Ratings in the three sizes. */}
    <Row title="Boyut">{sizes.map((s) => <Rating value={4} readonly size={s} label={`Boyut ${s}`} />)}</Row>
    {/* max: the number of marks; m:color: the colour token. */}
    <Row title="İşaret sayısı (max) ve renk">
      <Rating bind:value={$service} max={10} label="Hizmet puanı" m:color="brand-blue" starLabel={(n: number) => `Hizmet ${n}`} />
      <span>Hizmet: {$service} / 10</span>
    </Row>
    {/* readonly with a fractional value: 4.5 fills half of the fifth mark; the value is still read out by screen
        readers. */}
    <Row title="Salt okunur, kesirli">
      <Rating value={4.5} readonly label="Ortalama 4,5" m:color="brand-gold" />
      <Rating value={2.3} readonly label="Ortalama 2,3" size="sm" />
    </Row>
    {/* icon (and iconOn for the filled mark) take an icon or a function (n) => node that draws anything. */}
    <Row title="Kendi işaretin">
      <Rating bind:value={$score} icon={heart} m:color="danger" label="Sevgi" starLabel={(n: number) => `${n} kalp`} />
      <Rating bind:value={$score} icon={(n: number) => <b>{n}</b>} iconOn={(n: number) => <b>{n}✓</b>} m:color="brand-green" label="Sayılarla"
        starLabel={(n: number) => `Sayı ${n}`} />
    </Row>
    {/* animate={false}: no hover growth and no fade. */}
    <Row title="Hareketsiz (animate={false})">
      <Rating bind:value={$score} animate={false} label="Hareketsiz" starLabel={(n: number) => `Hareketsiz ${n}`} />
    </Row>
    {/* The same component on a dark surface (m:theme="night" works on every component). */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Rating bind:value={$score} m:color="brand-orange" label="Gece puanı" starLabel={(n: number) => `Gece ${n}`} />
      </Row>
    </Card>
  </div>
}
