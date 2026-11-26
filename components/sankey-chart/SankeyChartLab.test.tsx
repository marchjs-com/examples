import { test, expect, renderTest } from "march/testing"
import { SankeyChartLab } from "./SankeyChartLab.tsx"

// Tests for SankeyChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the drawing, selection, the table headers, the neutral ribbons and the empty state, so a change to
// SankeyChart that breaks any of them shows up here first.

// Proves the remapped fields are read: five links name six distinct nodes, giving six nodes and five ribbons, and
// the node names come from the node rows (nodeLabel="ad" → "Bütçe"), not from the codes in the links ("butce").
test("altı düğüm, beş şerit; düğüm adları satırlardan", () => {
  const s = renderTest(() => <SankeyChartLab />)
  const flow = s.get(".lab-flow")!
  expect(flow.querySelectorAll(".m-sankey-node").length).toBe(6)
  expect(flow.querySelectorAll(".m-sankey-link").length).toBe(5)
  expect(flow.querySelector(".m-sankey-nodes")!.textContent).toContain("Bütçe")
})

// Proves onSelect: a click on a node calls it with kind "node" (not "link").
// s.flush() waits for the reactive update before reading the text.
test("bir düğüme tıklamak onu seçer", async () => {
  const s = renderTest(() => <SankeyChartLab />)
  s.get(".lab-flow .m-sankey-node")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("node")
})

// Proves two props: tableLabels renames the hidden table's headers (what screen readers hear), and
// linkColor="neutral" on the second chart creates no gradients at all.
test("tablo başlıkları kendi adlarıyla; gri şeritler gradyansız", () => {
  const s = renderTest(() => <SankeyChartLab />)
  expect(s.get(".lab-flow table thead")!.textContent).toContain("Nereden")
  expect(s.get(".lab-mini linearGradient")).toBe(null)
})

// Proves the empty state: with no links the `empty` text is shown instead of a broken chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <SankeyChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Akış yok")).toBe(true)
})
