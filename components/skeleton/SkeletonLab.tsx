import { Skeleton, Card } from "march/ui"

// Skeleton'un bütün özellikleri bir arada: lines, shortLast, block + height, shape="circle" + height, colors
// (tema, single, brand), shimmer, label ve class
const heights = ["sm", "md", "lg"] as const

// bir başlık ve altında içerik
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function SkeletonLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <Box title="Satırlar"><Skeleton /></Box>
    <Box title="5 satır, son satır tam, kendi adı"><Skeleton lines={5} shortLast={false} label="Makale yükleniyor" class="lab-lines" /></Box>
    <Box title="Bloklar">{heights.map((h) => <Skeleton block height={h} />)}</Box>
    <Box title="Daireler">
      <div sx={{ flex: ["row", "center"], gap: 2 }}>{heights.map((h) => <Skeleton shape="circle" height={h} />)}</div>
    </Box>
    <Box title="Renk ve hareket">
      <Skeleton lines={2} colors="brand" />
      <Skeleton lines={2} colors="single" shimmer={false} class="lab-still" />
    </Box>
    <Card m:theme="night">
      <Box title="Koyu zemin"><Skeleton lines={3} /></Box>
    </Card>
  </div>
}
