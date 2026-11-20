import { Grid } from "march/ui"

// renk duvarı: 7 renk 4 sütunda; balance satırları dengeler (4 + 3), fill="stretch" son satırı doldurur
const colors = ["brand-orange", "brand-blue", "brand-green", "brand-purple", "brand-pink", "brand-gold", "danger"]

const Swatch = (props: { color: string }) => <div sx={{ p: 4, radius: 2, flex: "center", text: ["sm", "bold"] }} m:color={props.color}
  class="m-tone-solid">{props.color}</div>

export function ColorWall() {
  return <Grid cols={4} gap={2} fill="stretch" balance>
    {colors.map((c) => <Swatch color={c} />)}
  </Grid>
}
