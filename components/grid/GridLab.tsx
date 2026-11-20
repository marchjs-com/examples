import { Grid } from "march/ui"

// Grid'in bütün özellikleri: cols, gap, min (otomatik sütun), fill (stretch / last), balance, minCol, equal, class
const Tile = (props: { n: number; tall?: boolean }) => <div class="sc-tile" sx={{ p: props.tall ? 6 : 2 }}><span>Kart {props.n}</span></div>
const tiles = (n: number, tall = -1) => Array.from({ length: n }, (_, i) => <Tile n={i + 1} tall={i === tall} />)

export function GridLab() {
  return <div sx={{ flex: "col", gap: 4 }}>
    <Grid class="lab-cols" cols={3} gap={2}>{tiles(5)}</Grid>
    <Grid class="lab-last" cols={3} gap={2} fill="last">{tiles(5)}</Grid>
    <Grid class="lab-balance" cols={4} gap={2} balance>{tiles(5)}</Grid>
    <Grid class="lab-min" min="10rem" gap={1}>{tiles(4)}</Grid>
    <Grid class="lab-equal" cols={2} gap={2} minCol="8rem" equal fill="stretch">{tiles(3, 0)}</Grid>
  </div>
}
