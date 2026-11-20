import { Spinner, Card, Button } from "march/ui"

// Spinner'ın bütün özellikleri bir arada: size (sm, md, lg, em), label (metin ya da erişimci), decorative,
// colors (brand, renk listesi, single), color (tek tema rengi) ve class
const sizes = ["sm", "md", "lg"] as const

// bir sıra halka ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function SpinnerLab() {
  let $n = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Boyut">{sizes.map((s) => <Spinner size={s} label={`Boyut ${s}`} />)}</Row>
    <Row title="Renkler">
      <Spinner colors="brand" label="Marka renkleri" />
      <Spinner colors={["brand-blue", "brand-green"]} label="İki renk" class="lab-pair" />
      <Spinner colors="single" label="Tek renk" />
      <Spinner color="brand-orange" label="Turuncu" class="lab-orange" />
    </Row>
    <Row title="Metin içinde (em) ve süs">
      <span sx={{ text: "lg", color: "brand-purple" }}><Spinner size="em" decorative class="lab-em" /> Yükleniyor…</span>
    </Row>
    <Row title="Ad erişimcisi">
      <Spinner label={() => `${$n} dosya kaldı`} class="lab-count" />
      <Button size="sm" on:click={() => $n = Math.max(0, $n - 1)}>Bir dosya bitti</Button>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">{sizes.map((s) => <Spinner size={s} colors="brand" />)}</Row>
    </Card>
  </div>
}
