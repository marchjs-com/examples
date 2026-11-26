import { test, expect, renderTest } from "march/testing"
import { NetworkGraphLab } from "./NetworkGraphLab.tsx"

// Tests for NetworkGraphLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the drawing, keyboard selection, adding data and the empty state, so a change to NetworkGraph that
// breaks any of them shows up here first.

// Proves the remapped fields are read: five people (id="key") give five nodes, four ties (source="from",
// target="to") give four links, and three teams (group="ekip") give three legend items.
test("beş kişi beş düğüm, dört bağ dört çizgi; üç ekip açıklamada", () => {
  const s = renderTest(() => <NetworkGraphLab />)
  const net = s.get(".lab-net")!
  expect(net.querySelectorAll(".m-network-node").length).toBe(5)
  expect(net.querySelectorAll(".m-network-link").length).toBe(4)
  expect(net.querySelectorAll(".m-chart-legend-item").length).toBe(3)
})

// Proves keyboard access: Home moves to the first node and Enter selects it, calling onSelect with Ada, the first
// row. This is how someone without a mouse picks a node. s.flush() waits for the reactive update.
test("klavyeyle ilk düğüme gelip Enter onu seçer", async () => {
  const s = renderTest(() => <NetworkGraphLab />)
  const svg = s.get(".lab-net svg")!
  svg.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }))
  svg.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Ada")
})

// Proves the nodes / links signals are reactive: one click adds exactly one node and one link to the drawing.
test("kişi eklemek bir düğüm ve bir bağ ekler", async () => {
  const s = renderTest(() => <NetworkGraphLab />)
  await s.click(".lab-add")
  expect(s.get(".lab-net")!.querySelectorAll(".m-network-node").length).toBe(6)
  expect(s.get(".lab-net")!.querySelectorAll(".m-network-link").length).toBe(5)
})

// Proves the empty state: with no nodes the `empty` text is shown instead of a broken graph.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <NetworkGraphLab />)
  await s.click(".lab-empty")
  expect(s.sees("Kimse yok")).toBe(true)
})
