// ColorWall: the creative-minimal Grid example.
//
// What it shows: seven colour swatches in four columns. `balance` spreads them evenly (4 + 3), and `fill="stretch"` makes the
// last row's items grow to fill the row, so there is no ragged gap at the end.
// When to use this pattern: galleries and card lists where the item count is not a multiple of the column count.
// Grid is pure CSS: it never overflows horizontally, and `cols` steps down on tablets and phones by itself.
import { Grid } from "march/ui"

// Seven colour tokens, one per swatch.
const colors = ["brand-orange", "brand-blue", "brand-green", "brand-purple", "brand-pink", "brand-gold", "danger"]

// One swatch: a solid tone of its colour token (the common prop m:color sets the colour; the m-tone-solid class gives the
// solid look) with the token's name as text.
const Swatch = (props: { color: string }) => <div sx={{ p: 4, radius: 2, flex: "center", text: ["sm", "bold"] }} m:color={props.color}
  class="m-tone-solid">{props.color}</div>

export function ColorWall() {
  // - cols={4}: four columns (fewer on narrow screens). gap={2}: the spacing step between cells.
  // - fill="stretch": the items of the last row share the remaining space.
  // - balance: picks the column count that spreads the items evenly over the rows (7 items in 4 columns: 4 + 3, not 4 + 2 + 1).
  return <Grid cols={4} gap={2} fill="stretch" balance>
    {colors.map((c) => <Swatch color={c} />)}
  </Grid>
}
