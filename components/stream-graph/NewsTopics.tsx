import { StreamGraph } from "march/charts"
import { Card, Segmented } from "march/ui"

// NewsTopics: a real-life StreamGraph. How much a news site wrote about each topic, month by month, over two years.
// The baseline is switchable: a free-flowing stream, a centred silhouette, or shares of 100 % to compare proportions.
// Each layer has an edge line here (edges), which helps when the stream is printed or exported.

const TOPICS = { ekonomi: "Ekonomi", spor: "Spor", teknoloji: "Teknoloji", kultur: "Kültür", saglik: "Sağlık" }
const MONTH = 30 * 864e5, START = Date.UTC(2025, 0, 1)
const wave = (i: number, base: number, amp: number, k: number) => Math.max(5, Math.round(base + amp * Math.sin((i + k) / 3) + (amp / 2) * Math.cos((i * 5 + k) / 4)))
const ROWS = Array.from({ length: 24 }, (_, i) => ({
  ay: START + i * MONTH, ekonomi: wave(i, 120, 40, 1), spor: wave(i, 90, 35, 4), teknoloji: wave(i, 70, 30, 7), kultur: wave(i, 50, 20, 2), saglik: wave(i, 40, 25, 9),
}))

export function NewsTopics() {
  // The Segmented control binds the baseline; the chart reads it reactively and the layers glide to the new shape.
  let $offset: "wiggle" | "silhouette" | "expand" = "wiggle"
  return <Card title="Konulara göre haber sayısı" actions={[<Segmented size="sm" bind:value={$offset} aria-label="Taban"
    options={[{ value: "wiggle", label: "Akış" }, { value: "silhouette", label: "Ortalı" }, { value: "expand", label: "%100" }]} />]}>
    {/*
      xFormat="date" labels the time axis; legend="right" keeps the long topic names readable; export adds PNG / SVG /
      CSV buttons for the report. Keyboard: Tab to the chart, ← → walk the months, the tooltip lists every topic.
    */}
    <StreamGraph data={ROWS} x="ay" y={Object.keys(TOPICS)} series={TOPICS} offset={$offset} edges xFormat="date"
      legend="right" export title="Konulara göre haber" height={300} />
  </Card>
}
