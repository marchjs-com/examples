import { test, expect, renderTest } from "march/testing"
import { SunburstChartLab } from "./SunburstChartLab.tsx"

// Tests for SunburstChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the tree, drilling with a click, zooming from outside through `focus`, the empty state and the plain
// ring, so a change to SunburstChart that breaks any of them shows up here first.

// Proves the hierarchy is read through childrenOf / value / label: three groups and six items give nine arcs, and the
// middle shows the `center` function's text for the root (the rootLabel, budget, at 100 %).
test("üç grup ve altı kalem dokuz yay; ortada bütçe", () => {
  const s = renderTest(() => <SunburstChartLab />)
  const sun = s.get(".lab-sun")!
  expect(sun.querySelectorAll(".m-sunburst-node").length).toBe(9)
  expect(sun.querySelector(".m-sunburst-center-value")!.textContent).toBe("Bütçe %100")
})

// Proves drill, onDrill and onSelect together: a click on the first group (a node with children) zooms into it and
// both callbacks report "Yemek". s.flush() waits for the reactive update before reading the text.
test("bir gruba tıklamak içine girer ve seçer", async () => {
  const s = renderTest(() => <SunburstChartLab />)
  s.get(".lab-sun .m-sunburst-parent")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-level")!.textContent).toContain("Yemek")
  expect(s.get(".lab-picked")!.textContent).toContain("Yemek")
})

// Proves the `focus` prop is reactive: a button outside the chart zooms into "ev" (home), and both the breadcrumb path
// and the middle follow. This is what lets an app drive the chart from a list, a URL or a search box.
test("dışarıdan odak: focus ile eve girer, yol satırında Ev yazar", async () => {
  const s = renderTest(() => <SunburstChartLab />)
  await s.click(".lab-home")
  // the path bar (Breadcrumbs) is loaded as its own chunk on first use: give it a moment to arrive
  await new Promise((r) => setTimeout(r, 300))
  expect(s.get(".lab-sun .m-sunburst-crumbs")!.textContent).toContain("Ev")
  expect(s.get(".lab-sun .m-sunburst-center-value")!.textContent).toContain("Ev")
})

// Proves two switches: center={false} removes the middle entirely on the plain ring, and emptying the data shows the
// `empty` text instead of a broken chart.
test("veri boşalınca boş metni görünür; düz halkada orta yok", async () => {
  const s = renderTest(() => <SunburstChartLab />)
  expect(s.get(".lab-plain .m-sunburst-center")).toBe(null)
  await s.click(".lab-empty")
  expect(s.sees("Harcama yok")).toBe(true)
})
