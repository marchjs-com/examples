// SkeletonLab: the full-featured Skeleton example; it uses every prop at least once.
//
// Props shown here: lines, shortLast, block with height, shape="circle" with height, colors (the theme's, "single",
// "brand"), shimmer, label and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SkeletonLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Skeleton, Card } from "march/ui"

// The three sizes of a block (and of a circle).
const heights = ["sm", "md", "lg"] as const

// A caption above its example.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function SkeletonLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* No props: three text lines, the last one shorter. */}
    <Box title="Satırlar"><Skeleton /></Box>
    {/* lines={5}: five lines. shortLast={false}: the last line has the full width too. label: the accessible name of the
        lines; they also carry aria-busy="true", so a screen reader knows what is loading. class lets the tests find it. */}
    <Box title="5 satır, son satır tam, kendi adı"><Skeleton lines={5} shortLast={false} label="Makale yükleniyor" class="lab-lines" /></Box>
    {/* block: one block instead of lines, of height sm, md or lg. A block is decorative (aria-hidden): the region around
        it should say that it is loading. */}
    <Box title="Bloklar">{heights.map((h) => <Skeleton block height={h} />)}</Box>
    {/* shape="circle": one round shape, for an avatar on its way; height sets its size (the CSS variable --m-skel-size
        can set another size). Also decorative. */}
    <Box title="Daireler">
      <div sx={{ flex: ["row", "center"], gap: 2 }}>{heights.map((h) => <Skeleton shape="circle" height={h} />)}</div>
    </Box>
    {/* colors="brand": a four-colour shimmer; colors="single": neutral even in a multicolour theme; without the prop the
        theme decides. shimmer={false}: still shapes with no moving light. (The shimmer also stops under reduced motion.) */}
    <Box title="Renk ve hareket">
      <Skeleton lines={2} colors="brand" />
      <Skeleton lines={2} colors="single" shimmer={false} class="lab-still" />
    </Box>
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. */}
    <Card m:theme="night">
      <Box title="Koyu zemin"><Skeleton lines={3} /></Box>
    </Card>
  </div>
}
