import { test, expect, renderTest } from "march/testing"
import { TreemapLab } from "./TreemapLab.tsx"

// Tests for TreemapLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the layout, drilling and selecting, zooming from outside through `focus`, the color scale and the empty
// state, so a change to Treemap that breaks any of them shows up here first.

// Proves the hierarchy is read through childrenOf / value / label: three groups and six leaf tiles, and `title` becomes
// the SVG's accessible name.
test("üç grup, altı kutu; başlık ve açıklama", () => {
  const s = renderTest(() => <TreemapLab />)
  const map = s.get(".lab-map")!
  expect(map.querySelectorAll(".m-treemap-group").length).toBe(3)
  expect(map.querySelectorAll(".m-treemap-leaf").length).toBe(6)
  expect(map.querySelector("svg title")!.textContent).toBe("Aylık bütçe")
})

// Proves the two kinds of click: on a group it drills (onDrill reports "Yemek"), on a leaf it selects (onSelect reports
// "Market"). s.flush() waits for the reactive update before reading the text.
test("bir gruba tıklamak içine girer, yaprağa tıklamak seçer", async () => {
  const s = renderTest(() => <TreemapLab />)
  s.get(".lab-map .m-treemap-group")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-level")!.textContent).toContain("Yemek")
  s.get(".lab-map .m-treemap-leaf")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Market")
})

// Proves the `focus` prop is reactive: a button outside the chart makes "ev" (home) the root, the root tile appears
// and the breadcrumb row names it. This is what lets an app drive the chart from a list, a URL or a search box.
test("dışarıdan odak: focus ile eve girer", async () => {
  const s = renderTest(() => <TreemapLab />)
  await s.click(".lab-home")
  expect(s.get(".lab-map .m-treemap-root")).not.toBe(null)
  // the path bar (Breadcrumbs) is loaded as its own chunk on first use: give it a moment to arrive
  await new Promise((r) => setTimeout(r, 300))
  expect(s.get(".lab-map .m-treemap-crumbs")!.textContent).toContain("Ev")
})

// Proves two things: colorValue turns on the color scale under the second chart (colorLegend), and emptying the data
// shows the `empty` text instead of a broken chart.
test("veri boşalınca boş metni görünür; renk ölçeği altta", async () => {
  const s = renderTest(() => <TreemapLab />)
  expect(s.get(".lab-change .m-treemap-scale")).not.toBe(null)
  await s.click(".lab-empty")
  expect(s.sees("Harcama yok")).toBe(true)
})
