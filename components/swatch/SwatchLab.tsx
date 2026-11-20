import { Swatch, Card, CHECKER } from "march/ui"
import { heart } from "march/icons"

// Swatch'ın bütün özellikleri: renk türleri (düz, gradyan, saydam, tema belirteci), boyut, biçim, dama zemini,
// tıklanır düğme (onClick + selected → aria-pressed), seçili işareti (tik, ikon, metin), devre dışı, rol (radio →
// aria-checked), içerik, resim (label → role="img") ve süs (label yok), class / id / title / data-*, CHECKER sınıfı
const sizes = ["xs", "sm", "md", "lg"] as const
const shapes = ["round", "square", "circle"] as const
const palette: [string, string][] = [["#f2801f", "Turuncu"], ["#1d9ad6", "Mavi"], ["#78be3a", "Yeşil"]]

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function SwatchLab() {
  let $color = "Turuncu"
  let $size = "M"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Boyut">{sizes.map((s) => <Swatch color="#1d9ad6" size={s} label={`Mavi (${s})`} />)}</Row>
    <Row title="Biçim">{shapes.map((s) => <Swatch color="#a3338c" shape={s} label={`Mor (${s})`} />)}</Row>
    <Row title="Renk türleri">
      <Swatch color="linear-gradient(135deg, #f2801f, #a3338c)" label="Gradyan" />
      <Swatch color="rgb(29 154 214 / .35)" label="Saydam, dama zeminli" />
      <Swatch color="rgb(29 154 214 / .35)" checker={false} label="Saydam, düz zemin" />
      <Swatch color="brand-green" label="Tema belirteci" />
      <Swatch color="#111827" />
    </Row>
    <Row title="Tıklanır (onClick + selected)">
      {palette.map(([c, name]) => <Swatch color={c} label={name} selected={$color === name} onClick={() => $color = name} />)}
      <Swatch color="#9ca3af" label="Tükendi" disabled onClick={() => $color = "Tükendi"} />
      <span>Seçili: {$color}</span>
    </Row>
    <Row title="Seçili işareti">
      <Swatch color="#78be3a" label="Tik" selected mark />
      <Swatch color="#f2801f" label="İkon" selected mark={heart} shape="circle" />
      <Swatch color="#1d9ad6" label="Metin" selected mark="1" />
    </Row>
    <div role="radiogroup" aria-label="Beden">
      <Row title="Rol (radio) ve içerik">
        {["S", "M", "L"].map((b) => <Swatch color="#e5e7eb" role="radio" label={`Beden ${b}`} selected={$size === b} onClick={() => $size = b}>{b}</Swatch>)}
        <span>Beden: {$size}</span>
      </Row>
    </div>
    <Row title="Öznitelikler ve CHECKER">
      <Swatch color="#f2801f" id="lab-swatch" class="lab-swatch" title="Kendi ipucum" data-code="F2801F" label="Öznitelikli" />
      <div class={CHECKER} sx={{ p: 4, radius: 2 }} role="img" aria-label="Dama zemini" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">{palette.map(([c, name]) => <Swatch color={c} label={`Gece ${name}`} shape="circle" mark selected={$color === name} onClick={() => $color = name} />)}</Row>
    </Card>
  </div>
}
