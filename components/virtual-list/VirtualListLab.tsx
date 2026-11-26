// VirtualListLab: the full-featured VirtualList example; it uses every prop at least once.
//
// Props shown here: items, key, render, estimate, overscan, gap, scroll, onEndReached, endDistance, header, footer, label,
// role, id, api (scrollToIndex) and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// VirtualListLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { VirtualList, Button } from "march/ui"

// 1,000 rows of demo data; every fifth row is "tall" and draws an extra line, so rows have different heights.
const rows = Array.from({ length: 1000 }, (_, i) => ({ id: i, title: `Satır ${i + 1}`, tall: i % 5 === 0 }))

export function VirtualListLab() {
  // $ends counts how often the end was reached, $gap is the space between rows (a signal), and `jump` will hold the
  // scrollToIndex function that the list hands us through the `api` prop.
  let $ends = 0
  let $gap = 0
  let jump: ((i: number, align?: "nearest" | "start" | "center") => void) | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* api.scrollToIndex(index, align) brings a row into view; align is "nearest", "start" or "center". */}
      <Button size="sm" on:click={() => jump?.(499, "center")}>500. satıra git</Button>
      <Button size="sm" on:click={() => $gap = $gap ? 0 : 8}>{() => `Ara: ${$gap}`}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Sona ulaşıldı: ${$ends} kez`}</p>
    {/* The list needs a box with a fixed height to scroll inside. */}
    <div style={{ height: "300px" }}>
      {/* The props, in groups:
          - label, id, class, role: the accessible name, the id of the rows' container, an extra class, and its role
            (the default is "list"; with another role such as "listbox" your rows carry the role instead).
          - scroll="self": the list scrolls in its own box; "parent" would use the nearest scrolling ancestor.
          - items, key, render: the data, a stable id per item, and the function that draws a row. render gets an
            accessor for the item and the index.
          - estimate={40}: the expected height of a row until it is measured (the tall rows are measured when drawn).
          - overscan={200}: how many pixels beyond the viewport are drawn on each side. gap: space between rows.
          - endDistance={400} and onEndReached: called once per item count when the end is within 400 px.
          - api: receives the handle once; header / footer: drawn before and after the rows inside the scroll area.
          The function child redraws the list when $gap changes. */}
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
