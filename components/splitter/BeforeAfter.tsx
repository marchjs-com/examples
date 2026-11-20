import { Splitter, Card } from "march/ui"

// önce / sonra: iki renk alanı arasında tutamaç; pay yüzde olarak yazılır
export function BeforeAfter() {
  let $share = 0.5
  return <Card m:theme="night">
    <div style={{ "block-size": "14rem" }}>
      <Splitter initial={0.5} min={0.1} label="Karşılaştırma" m:color="brand-orange" onChange={(s: number) => $share = s}
        start={<div sx={{ p: 4, flex: "center", text: ["lg", "bold"], color: "brand-blue" }}>Önce</div>}
        end={<div sx={{ p: 4, flex: "center", text: ["lg", "bold"], color: "brand-orange" }}>Sonra</div>} />
    </div>
    <span sx={{ text: "sm", color: "muted" }}>Önce: %{Math.round($share * 100)}</span>
  </Card>
}
