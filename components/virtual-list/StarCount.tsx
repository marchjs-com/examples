// StarCount: the creative-minimal VirtualList example.
//
// What it shows: a list of 100,000 stars (every tenth row is a constellation) that scrolls smoothly, because only the
// rows you can see exist in the page.
// When to use this pattern: when a list is so long that drawing all of it would be slow. You give VirtualList the data
// and a render function, and it does the windowing.
import { VirtualList, Card } from "march/ui"

// 100,000 items of demo data, created once outside the component.
const sky = Array.from({ length: 100000 }, (_, i) => ({ id: i, name: i % 10 === 0 ? `✨ Takımyıldız ${i / 10 + 1}` : `⭐ Yıldız ${i + 1}` }))

export function StarCount() {
  return <Card title="100 000 yıldız">
    {/* The list scrolls inside a box of fixed height (scroll="self" is the default). */}
    <div style={{ height: "260px" }}>
      {/* items: the array (an accessor would work too). key: a stable id per item. estimate={32}: the expected row
          height in pixels until a row has been measured (rows may have any height). render gets an accessor for the
          item, so the text is read inside a function: that keeps a row correct if its item changes. label names the
          list for screen readers, which also hear the position of a row ("row 41 of 100,000"). */}
      <VirtualList label="Yıldızlar" items={sky} key={(s) => s.id} estimate={32}
        render={(s) => <div sx={{ p: 1 }}>{() => s().name}</div>} />
    </div>
  </Card>
}
