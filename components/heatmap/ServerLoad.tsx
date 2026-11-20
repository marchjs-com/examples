import { Heatmap } from "march/charts"
import { Card, Segmented } from "march/ui"

// sunucu yükü: bölge × saat, ortam seçilir; en yoğun hücreye tıklamak onu adıyla gösterir
const REGIONS = ["İstanbul", "Frankfurt", "Virginia", "Singapur"]
const load = (env: string) => REGIONS.flatMap((bolge, r) => Array.from({ length: 12 }, (_, i) => ({
  saat: i * 2, bolge, yuk: Math.round(30 + 50 * Math.max(0, Math.sin(((i * 2 - r * 5) / 24) * Math.PI)) + ((i * 7 + r * 3) % 11) * (env === "prod" ? 3 : 1)),
})))

export function ServerLoad() {
  let $env = "prod"
  let $cell = "Bir hücre seç"
  return <Card title="Sunucu yükü (%)" actions={[<Segmented size="sm" bind:value={$env} aria-label="Ortam" options={[{ value: "prod", label: "Canlı" }, { value: "staging", label: "Deneme" }]} />]}>
    <Heatmap data={() => load($env)} x="saat" y="bolge" value="yuk" xFormat={(h: number) => `${h}:00`} yDomain={REGIONS} max={100} levels={6}
      format={(v: number) => `%${v}`} valueLabel="Yük" animate="out" title="Sunucu yükü" onSelect={(c: { x: unknown; y: unknown; value: number | null }) => { $cell = `${c.y} ${c.x}:00 · %${c.value}` }} />
    <p sx={{ text: "sm", color: "muted" }}>{() => $cell}</p>
  </Card>
}
