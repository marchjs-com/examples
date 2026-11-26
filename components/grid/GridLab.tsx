// GridLab: the full-featured Grid example; it uses every prop at least once.
//
// Props shown here: cols, gap, min (automatic columns), fill ("stretch" and "last"), balance, minCol, equal and class.
// Five small grids, one per idea; each has a class so the tests can find it.
// Use it as a reference when you need one option: find the prop below and copy the line.
// GridLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Grid } from "march/ui"

// A card for the grid. `tall` gives one tile more padding, so the `equal` example has uneven heights to even out.
const Tile = (props: { n: number; tall?: boolean }) => <div class="sc-tile" sx={{ p: props.tall ? 6 : 2 }}><span>Kart {props.n}</span></div>
// Builds n tiles; `tall` is the index of the tile to make taller (-1: none).
const tiles = (n: number, tall = -1) => Array.from({ length: n }, (_, i) => <Tile n={i + 1} tall={i === tall} />)

export function GridLab() {
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* cols={3} gap={2}: three columns and a spacing step; with five tiles the last row has two cells. */}
    <Grid class="lab-cols" cols={3} gap={2}>{tiles(5)}</Grid>
    {/* fill="last": the free space of the last row goes to its last item. */}
    <Grid class="lab-last" cols={3} gap={2} fill="last">{tiles(5)}</Grid>
    {/* balance: with five tiles and four columns, picks the count that spreads evenly (3 + 2) instead of 4 + 1. */}
    <Grid class="lab-balance" cols={4} gap={2} balance>{tiles(5)}</Grid>
    {/* min="10rem": automatic columns, each at least 10rem wide (cols is not used). */}
    <Grid class="lab-min" min="10rem" gap={1}>{tiles(4)}</Grid>
    {/* minCol: the narrowest column before fewer columns are used; equal: every row as tall as the tallest; fill="stretch": the last row stretches. */}
    <Grid class="lab-equal" cols={2} gap={2} minCol="8rem" equal fill="stretch">{tiles(3, 0)}</Grid>
  </div>
}
