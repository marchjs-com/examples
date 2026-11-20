import { addCornerControl, Button, Segmented } from "march/ui"

// geri bildirim düğmesi: köşe seçilir, düğme oraya taşınır; eski köşeden çıkar
export function FeedbackCorner() {
  let $corner = "bottom-start"
  let off = () => {}
  const place = (c: string) => { off(); off = addCornerControl(c as "bottom-start", <Button size="sm" variant="primary">Geri bildirim</Button> as Node, 1); $corner = c }
  place("bottom-start")
  return <div sx={{ flex: "col", gap: 2 }}>
    <Segmented aria-label="Köşe" value={$corner} options={["top-start", "top-end", "bottom-start", "bottom-end"]} onChange={place} />
    <span sx={{ text: "sm", color: "muted" }}>Düğme şimdi {$corner} köşesinde</span>
  </div>
}
