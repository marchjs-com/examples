import { VirtualList, Button } from "march/ui"

// VirtualList'in bütün özellikleri bir arada: items, key, render, estimate, overscan, gap, scroll, onEndReached,
// endDistance, header, footer, label, role, id, api (scrollToIndex), class
const rows = Array.from({ length: 1000 }, (_, i) => ({ id: i, title: `Satır ${i + 1}`, tall: i % 5 === 0 }))

export function VirtualListLab() {
  let $ends = 0
  let $gap = 0
  let jump: ((i: number, align?: "nearest" | "start" | "center") => void) | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => jump?.(499, "center")}>500. satıra git</Button>
      <Button size="sm" on:click={() => $gap = $gap ? 0 : 8}>{() => `Ara: ${$gap}`}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Sona ulaşıldı: ${$ends} kez`}</p>
    <div style={{ height: "300px" }}>
      {() => <VirtualList label="Laboratuvar listesi" id="lab-vlist" class="lab-vlist" role="list" scroll="self"
        items={rows} key={(r) => r.id} estimate={40} overscan={200} gap={$gap}
        endDistance={400} onEndReached={() => $ends++}
        api={(a: { scrollToIndex: (i: number, align?: "nearest" | "start" | "center") => void }) => { jump = a.scrollToIndex }}
        header={<p sx={{ text: "bold", p: 1 }}>Başlık: 1 000 satır</p>}
        footer={<p sx={{ color: "muted", p: 1 }}>Liste sonu</p>}
        render={(r, i) => <div sx={{ p: 1 }}>{() => `${r().title} (#${i})`}{() => (r().tall ? <p sx={{ color: "muted" }}>Uzun satır: yüksekliği çizilince ölçülür</p> : null)}</div>} />}
    </div>
  </div>
}
